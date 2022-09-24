import React from "react";
import { Link } from "react-router-dom";

import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import CardTweet from "@/components/homePrivate/CardTweet";
import Aside from "@/components/aside/Aside";
import ButtonCustom from "@/widgets/ButtonCustom";
import IconSVG from "@/widgets/IconSVG";
import NavTabs from "@/widgets/NavTabs";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import { privateRoutes } from "@/routes/private.routes";
import { baseURL } from "@/config/axios";
import { IUserProfile, IPost, TTabState } from "@/models";
import { dateParserJoined } from "@/utils/dateParser";

type PropsType = {
  isCurrentUser: boolean;
  userProfile: IUserProfile | null;
  users: IUserProfile[] | null;
  posts: IPost[] | null;
  loadingPost: boolean;
  modalActiveState: { modalActive: boolean; setModalActive(value: boolean): void };
  tabState: TTabState[];
  activeTabState: { activeTab: number; setActiveTab(activeTabId: number): void };
};

const styleSpinnersLoding: React.CSSProperties = {
  transform: `translate(-50%)`,
};

const ContentProfile: React.FC<PropsType> = ({
  isCurrentUser,
  userProfile,
  users,
  posts,
  loadingPost,
  modalActiveState,
  tabState,
  activeTabState,
}) => {
  const { modalActive, setModalActive } = modalActiveState;
  const { activeTab, setActiveTab } = activeTabState;
  return (
    <>
      <main className="main">
        <div className="Profile main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet
              page={privateRoutes.profile.name}
              title={`${userProfile?.user.first_name} ${userProfile?.user.last_name}`}
              subtitle={`${
                posts?.filter((post) => post.authorDetail.public_id === userProfile?.user.public_id).length
              } Tweet`}
            />
          </section>
          <div className="pro-container">
            <div className="info-profile-container">
              <div className="cover-profile-pic">
                <img
                  src={
                    userProfile?.coverPicture
                      ? baseURL + userProfile.coverPicture
                      : baseURL + "/mediafiles/default/coverPic.jpg"
                  }
                  alt="coverPicture"
                />
                <img
                  className="profile-pic"
                  src={
                    userProfile?.profilePicture
                      ? baseURL + userProfile.profilePicture
                      : baseURL + "/mediafiles/default/profilePic.png"
                  }
                  alt="profilePicture"
                />
              </div>
              <div className="info-profile-container">
                {isCurrentUser && (
                  <ButtonCustom text="Edit profile" handleClick={() => setModalActive(!modalActive)} />
                )}
                <div className="info-profile">
                  <div className="box-info-name">
                    <h3>{`${userProfile?.user.first_name} ${userProfile?.user.last_name}`}</h3>
                    <p>@{userProfile?.pseudo}</p>
                  </div>
                  <div className="box-bio">
                    <p>{userProfile?.bio}</p>
                  </div>
                  <div className="box-info-date-joined">
                    <IconSVG iconName="calendar" fill="#919090" />
                    <p>Joined {userProfile?.created && dateParserJoined(userProfile.created)}</p>
                  </div>
                  <div className="box-info-follow">
                    <Link to="">
                      <span>20</span>
                      <p>Following</p>
                    </Link>
                    <Link to="">
                      <span>45</span>
                      <p>Follower</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <nav>
              <NavTabs listTabs={tabState} activeTab={activeTab} toggleTab={setActiveTab} />
            </nav>
            <div className="my-content-container">
              {(activeTab === 1 || activeTab === 2) && (
                <div className="tabs-tweets">
                  {loadingPost ? (
                    <SpinnersLoding isLoading={loadingPost} styleSpinnersLoding={styleSpinnersLoding} />
                  ) : (
                    posts
                      ?.filter((post) => post.authorDetail.public_id === userProfile?.user.public_id)
                      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                      .map((post) => (
                        <div className="list-post" key={post.publicId}>
                          <CardTweet
                            key={post.publicId}
                            currentUser={userProfile}
                            post={post}
                            users={users}
                          />
                        </div>
                      ))
                  )}
                </div>
              )}
              {activeTab === 4 && (
                <div className="tabs-tweets">
                  {loadingPost ? (
                    <SpinnersLoding isLoading={loadingPost} styleSpinnersLoding={styleSpinnersLoding} />
                  ) : (
                    posts
                      ?.filter((post) =>
                        post.liked.filter((like) =>
                          like.public_id === userProfile?.user.public_id ? true : false
                        )
                      )
                      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                      .map((post) => (
                        <div className="list-post" key={post.publicId}>
                          <CardTweet
                            key={post.publicId}
                            currentUser={userProfile}
                            post={post}
                            users={users}
                          />
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Aside page={privateRoutes.profile.name} />
    </>
  );
};

export default ContentProfile;
