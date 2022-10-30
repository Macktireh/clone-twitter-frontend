import React from "react";
import { Link } from "react-router-dom";

import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import CardTweet from "@/components/homePrivate/CardTweet";
import ButtonCustom from "@/widgets/ButtonCustom";
import ButtonFollow from "@/components/follow/ButtonFollow";
import IconSVG from "@/widgets/IconSVG";
import NavTabs from "@/widgets/NavTabs";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import { privateRoutes } from "@/routes/private.routes";
import { IUserProfile, IPost, TTabState } from "@/models";
import { dateParserJoined } from "@/utils/dateParser";

type propsTypes = {
  isCurrentUser: boolean;
  loadingPost: boolean;
  userProfile: IUserProfile | null;
  currentUser: IUserProfile | null;
  users: IUserProfile[] | null;
  posts: IPost[] | null;
  postsLikes: IPost[] | null;
  modalActiveState: { modalActive: boolean; setModalActive(value: boolean): void };
  tabState: TTabState[];
  activeTabState: { activeTab: number; setActiveTab(activeTabId: number): void };
};

const styleSpinnersLoding: React.CSSProperties = {
  transform: `translate(-50%)`,
};

const ContentProfile: React.FC<propsTypes> = ({
  isCurrentUser,
  currentUser,
  userProfile,
  users,
  posts,
  postsLikes,
  loadingPost,
  modalActiveState,
  tabState,
  activeTabState,
}) => {
  const { modalActive, setModalActive } = modalActiveState;
  const { activeTab, setActiveTab } = activeTabState;
  return (
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
            <img src={userProfile?.coverPicture as string} alt="coverPicture" />
            <img className="profile-pic" src={userProfile?.profilePicture as string} alt="profilePicture" />
          </div>
          <div className="info-profile-box">
            {isCurrentUser ? (
              <ButtonCustom text="Edit profile" onClick={() => setModalActive(!modalActive)} />
            ) : (
              <>
                <ButtonFollow
                  typeFollow={currentUser?.following.includes(userProfile?.user.public_id as string) ? 2 : 1}
                  userPubblicId={currentUser?.user.public_id as string}
                  userFollowing={userProfile?.user.public_id as string}
                />
              </>
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
                <Link to="following">
                  <span>{userProfile?.following.length}</span>
                  <p>Following</p>
                </Link>
                <Link to="followers">
                  <span>{userProfile?.followers.length}</span>
                  <p>Followers</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <NavTabs listTabs={tabState} activeTab={activeTab} toggleTab={setActiveTab} linkActive={false} />
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
                      <CardTweet key={post.publicId} currentUser={userProfile} post={post} users={users} />
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
                postsLikes
                  ?.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                  .map((post) => (
                    <div className="list-post" key={post.publicId}>
                      <CardTweet key={post.publicId} currentUser={currentUser} post={post} users={users} />
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentProfile;
