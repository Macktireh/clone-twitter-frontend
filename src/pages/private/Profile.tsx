import React from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import EdidProfile from "@/components/profile/EdidProfile";
import ModalEditProfile from "@/components/profile/ModalEditProfile";
import ContentProfile from "@/components/profile/ContentProfile";
import PopupDeletePost from "@/components/homePrivate/PopupDeletePost";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";
import Aside from "@/components/aside/Aside";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import getListPostsLikesAction from "@/actions/post/getMyLikesPost.action";
import EditProfileProvider from "@/context/EditProfileProvider";
import { IUserProfile, IPost, IRootState, IPropsRootStateType, TTabState } from "@/models";
import { privateRoutes } from "@/routes/private.routes";

interface propsTypes extends Omit<IPropsRootStateType, "comments" | "peopleConnect"> {
  getAllUsersAction?: () => void;
  getAllPostAction?: () => void;
  getListPostsLikesAction?: (public_id: string) => void;
}

const styleSpinnersLoding: React.CSSProperties = {
  width: "auto",
};

const Profile: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  postsLikes,
  followers,
  following,
  getAllUsersAction,
  getAllPostAction,
  getListPostsLikesAction,
}) => {
  // const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingPost, setLoadingPost] = React.useState<boolean>(true);
  const [activeTab, setActiveTab] = React.useState<number>(1);
  const [modalActive, setModalActive] = React.useState<boolean>(false);
  const [isCurrentUser, setIsCurrentUser] = React.useState<string>();
  const [anotherUser, setAnotherUser] = React.useState<IUserProfile>();
  const { pseudo } = useParams();
  const flag = React.useRef(false);
  const tabState: TTabState[] = [
    { id: 1, title: "Tweets", grow: false },
    { id: 2, title: "Tweets & replies", grow: true },
    { id: 3, title: "Media", grow: false },
    { id: 4, title: "Likes", grow: false },
  ];

  React.useEffect(() => {
    document.title = `${currentUser?.user.first_name} ${currentUser?.user.last_name} (@${currentUser?.pseudo}) | Clone Twitter`;

    if (!flag.current) {
      (async () => {
        getAllUsersAction && getAllUsersAction();
        getAllPostAction && getAllPostAction();

        flag.current = true;
      })();
    }

    if (currentUser && users) {
      if (pseudo === currentUser.pseudo) {
        setIsCurrentUser("yes");
        setAnotherUser(currentUser);
        // setLoading(false);
      } else {
        const searchUser = users.filter((user) => user.pseudo === pseudo);
        if (searchUser.length === 0) {
          setIsCurrentUser("error");
        } else {
          setIsCurrentUser("no");
          setAnotherUser(searchUser[0]);
          // setLoading(false);
        }
      }
    }

    if ((!postsLikes && anotherUser) || (activeTab === 4 && anotherUser))
      getListPostsLikesAction && getListPostsLikesAction(anotherUser.user.public_id as string);

    if (currentUser && users && posts) setLoadingPost(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, pseudo, isCurrentUser, currentUser, users, posts, followers, following, activeTab]);

  if (isCurrentUser === "error") return <Navigate to="/error/404" />;

  return !currentUser && !users && !posts ? (
    <>
      <main className="main">
        <SpinnersLoding
          isLoading={!currentUser && !users && !posts ? true : false}
          styleSpinnersLoding={styleSpinnersLoding}
        />
        <aside className="aside"></aside>
      </main>
    </>
  ) : (
    <>
      <EditProfileProvider>
        <ModalEditProfile
          modalActive={modalActive}
          titleModal="Edit Profile"
          textBtnModal="Save"
          handleCloseMmdal={() => setModalActive(!modalActive)}
          currentUser={anotherUser ? anotherUser : null}
        >
          <EdidProfile currentUser={anotherUser as IUserProfile} />
        </ModalEditProfile>
      </EditProfileProvider>
      <>
        <main className="main">
          <ContentProfile
            isCurrentUser={isCurrentUser === "yes" ? true : false}
            currentUser={currentUser as IUserProfile}
            userProfile={anotherUser as IUserProfile}
            users={users}
            posts={posts as IPost[]}
            postsLikes={postsLikes}
            loadingPost={loadingPost}
            modalActiveState={{ modalActive, setModalActive }}
            tabState={tabState}
            activeTabState={{ activeTab, setActiveTab }}
          />
          <Aside page={privateRoutes.profile.name} />
        </main>
      </>
      <ButtonAddTweet nameClass="add-tweet-global" />
      <PopupDeletePost />
    </>
  );
};

const ProfileConnectWithStore: React.FC<any> = ({
  currentUser,
  users,
  posts,
  postsLikes,
  followers,
  following,
  getAllUsersAction,
  getAllPostAction,
  getListPostsLikesAction,
}) => {
  return (
    <Layout>
      <Profile
        currentUser={currentUser}
        users={users}
        posts={posts}
        followers={followers}
        following={following}
        postsLikes={postsLikes}
        getAllUsersAction={getAllUsersAction}
        getAllPostAction={getAllPostAction}
        getListPostsLikesAction={getListPostsLikesAction}
      />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  posts: state.postReducer,
  postsLikes: state.mylLikesPostReducer,
  followers: state.followReducer.followers,
  following: state.followReducer.following,
});

export default connect(mapStateToProps, { getAllUsersAction, getAllPostAction, getListPostsLikesAction })(
  ProfileConnectWithStore
);
