import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Layout from "@/layout/Layout";
import CardTweet from "@/components/homePrivate/CardTweet";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import EdidProfile from "@/components/profile/EdidProfile";
import Aside from "@/components/aside/Aside";
import NavTabs from "@/widgets/NavTabs";
import IconSVG from "@/widgets/IconSVG";
import ButtonCustom from "@/widgets/ButtonCustom";
import Modal from "@/widgets/Modal";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import EditProfileProvider from "@/context/EditProfileProvider";
import { privateRoutes } from "@/routes/private.routes";
import { baseURL } from "@/config/axios";
import { IStateReduce, PropsStateType, TTabState } from "@/models";
import { dateParserJoined } from "@/utils/dateParser";

interface PropsType extends PropsStateType {
  checkAuthenticatedAction?: Function;
  getAllUsersAction?: any;
  getAllPostAction?: any;
}

const styleSpinnersLoding: React.CSSProperties = {
  transform: `translate(-50%)`
};

const Profile: React.FC<PropsType> = ({ currentUser, users, posts, getAllUsersAction, getAllPostAction }) => {
  const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);
  const tabState: TTabState[] = [
    { id: 1, title: "Tweets", grow: false },
    { id: 2, title: "Tweets & replies", grow: true },
    { id: 3, title: "Media", grow: false },
    { id: 4, title: "Likes", grow: false },
  ];
  const [activeTab, setActiveTab] = React.useState(1);
  const [modalActive, setModalActive] = React.useState(false);

  const toggleTab = (id: number) => {
    setActiveTab(id);
  };

  React.useEffect(() => {
    document.title = `${currentUser?.user.first_name} ${currentUser?.user.last_name} (@${currentUser?.pseudo}) | Clone Twitter`;

    if (!flag.current) {
      (async () => {
        getAllUsersAction();
        getAllPostAction();
        flag.current = true;
      })();
    }
    if (currentUser && users && posts) setLoading(false);
  }, [flag, currentUser, users, posts, getAllPostAction, getAllUsersAction]);

  return (
    <>
      <EditProfileProvider>
        <Modal
          modalActive={modalActive}
          titleModal="Edit Profile"
          textBtnModal="Save"
          handleClick={() => setModalActive(!modalActive)}
          currentUser={currentUser ? currentUser : null}
        >
          <EdidProfile currentUser={currentUser} />
        </Modal>
      </EditProfileProvider>
      <main className="main">
        <div className="Profile main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet
              page={privateRoutes.profile.name}
              title={`${currentUser?.user.first_name} ${currentUser?.user.last_name}`}
              subtitle={`${
                posts?.filter((post) => post.authorDetail.public_id === currentUser?.user.public_id).length
              } Tweet`}
            />
          </section>
          <div className="pro-container">
            <div className="info-profile-container">
              <div className="cover-profile-pic">
                <img
                  src={
                    currentUser?.coverPicture
                      ? baseURL + currentUser.coverPicture
                      : baseURL + "/mediafiles/default/coverPic.jpg"
                  }
                  alt=""
                />
                <img
                  className="profile-pic"
                  src={
                    currentUser?.profilePicture
                      ? baseURL + currentUser.profilePicture
                      : baseURL + "/mediafiles/default/coverPic.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="info-profile-container">
                <ButtonCustom text="Edit profile" handleClick={() => setModalActive(!modalActive)} />
                <div className="info-profile">
                  <div className="box-info-name">
                    <h3>
                      {currentUser?.user.first_name} {currentUser?.user.last_name}
                    </h3>
                    <p>@{currentUser?.pseudo}</p>
                  </div>
                  <div className="box-bio">
                    <p>{currentUser?.bio}</p>
                  </div>
                  <div className="box-info-date-joined">
                    <IconSVG iconName="calendar" fill="#919090" />
                    <p>Joined {currentUser?.created && dateParserJoined(currentUser.created)}</p>
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
              <NavTabs listTabs={tabState} activeTab={activeTab} toggleTab={toggleTab} />
            </nav>
            <div className="my-content-container">
              {(activeTab === 1 || activeTab === 2) && (
                <div className="tabs-tweets">
                  {loading ? <SpinnersLoding isLoading={loading} styleSpinnersLoding={styleSpinnersLoding} /> :
                  posts
                    ?.filter((post) => post.authorDetail.public_id === currentUser?.user.public_id)
                    .map((post) => (
                      <div className="list-post" key={post.publicId}>
                        <CardTweet key={post.publicId} currentUser={currentUser} post={post} users={users} />
                      </div>
                    ))}
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

const ProfileConnectWithStore: React.FC<PropsType> = ({
  currentUser,
  users,
  posts,
  getAllUsersAction,
  getAllPostAction,
}) => {
  return (
    <Layout>
      <Profile
        currentUser={currentUser}
        users={users}
        posts={posts}
        getAllUsersAction={getAllUsersAction}
        getAllPostAction={getAllPostAction}
      />
    </Layout>
  );
};

const mapStateToProps = (state: IStateReduce) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer.users,
  posts: state.postReducer.tweets,
});

export default connect(mapStateToProps, { getAllUsersAction, getAllPostAction })(ProfileConnectWithStore);
