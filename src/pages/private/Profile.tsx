import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Layout from "@/layout/Layout";
import CardTweet from "@/components/tweets/CardTweet";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import NavTabs from "@/components/widgets/NavTabs";
import IconSVG from "@/components/widgets/IconSVG";
import ButtonCustom from "@/components/widgets/ButtonCustom";
import Aside from "@/components/tweets/Aside";
import { tweetRoutes } from "@/routes/tweet.routes";
import { baseURL } from "@/config/axios";
import { IStateReduce, PropsStateType, TTabState } from "@/models";
// import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
// import getCurrentUserAction from "@/actions/auth/loadUser.action";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";

interface PropsType extends PropsStateType {
  checkAuthenticatedAction?: Function;
  getAllUsersAction?: any;
  getAllPostAction?: any;
}

const Profile: React.FC<PropsType> = ({ currentUser, posts, getAllUsersAction, getAllPostAction }) => {
  const flag = React.useRef(false);
  const tabState: TTabState[] = [
    { id: 1, title: "Tweets", grow: false },
    { id: 2, title: "Tweets & replies", grow: true },
    { id: 3, title: "Media", grow: false },
    { id: 4, title: "Likes", grow: false },
  ];
  const [activeTab, setActiveTab] = React.useState(1);

  const toggleTab = (id: number) => {
    setActiveTab(id);
  };

  React.useEffect(() => {
    document.title = `${currentUser?.user.first_name} ${currentUser?.user.last_name} (@${currentUser?.pseudo}) | Clone Twitter`;

    if (!flag.current) {
      (async () => {
        getAllUsersAction()
        getAllPostAction();
        flag.current = true;
      })();
    }

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });

  return (
    <>
      <main className="main">
        <div className="Profile main-container">
          <section className="sec-header">
            <SectionHeaderTweet
              page={tweetRoutes.profile.name}
              title={`${currentUser?.user.first_name} ${currentUser?.user.last_name}`}
              subtitle="1 Tweet"
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
                <ButtonCustom text="Edit profile" />
                <div className="info-profile">
                  <div className="box-info-name">
                    <h3>
                      {currentUser?.user.first_name} {currentUser?.user.last_name}
                    </h3>
                    <p>@{currentUser?.pseudo}</p>
                  </div>
                  <div className="box-info-date-joined">
                    <IconSVG iconName="calendar" fill="#919090" />
                    <p>Joined August 2019</p>
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
                  {posts
                    ?.filter((post) => post.authorDetail.public_id === currentUser?.user.public_id)
                    .map((post) => (
                      <div className="list-post" key={post.publicId}>
                        <CardTweet currentUser={currentUser} post={post} />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Aside page={tweetRoutes.profile.name} />
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

export default connect(mapStateToProps, { getAllUsersAction, getAllPostAction })(
  ProfileConnectWithStore
);
