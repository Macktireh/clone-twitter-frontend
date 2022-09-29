import React from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import Layout from "@/layout/Layout";
import EdidProfile from "@/components/profile/EdidProfile";
import ModalEditProfile from "@/components/profile/ModalEditProfile";
import ContentProfile from "@/components/profile/ContentProfile";
import PopupDeletePost from "@/components/homePrivate/PopupDeletePost";
import Aside from "@/components/aside/Aside";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import EditProfileProvider from "@/context/EditProfileProvider";
import { IUserProfile, IPost, IRootState, IPropsRootStateType, TTabState } from "@/models";
import { privateRoutes } from "@/routes/private.routes";

interface PropsType extends IPropsRootStateType {
  currentUser: IUserProfile | null;
  users: IUserProfile[] | null;
  posts: IPost[] | null;
  getAllUsersAction?: () => void;
  getAllPostAction?: () => void;
}

const styleSpinnersLoding: React.CSSProperties = {
  width: "auto",
};

const Profile: React.FC<PropsType> = ({ currentUser, users, posts, getAllUsersAction, getAllPostAction }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
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
        setLoading(false);
      } else {
        const searchUser = users.filter((user) => user.pseudo === pseudo);
        if (searchUser.length === 0) {
          setIsCurrentUser("error");
        } else {
          setIsCurrentUser("no");
          setAnotherUser(searchUser[0]);
          setLoading(false);
        }
      }
    }
    if (currentUser && users && posts) setLoadingPost(false);
  }, [flag, pseudo, isCurrentUser, currentUser, users, posts, getAllPostAction, getAllUsersAction]);

  if (isCurrentUser === "error") return <Navigate to="/error/404" />;

  return loading ? (
    <>
      <main className="main">
        <SpinnersLoding isLoading={loading} styleSpinnersLoding={styleSpinnersLoding} />
      </main>
      <aside className="aside"></aside>
    </>
  ) : (
    <>
      <EditProfileProvider>
        <ModalEditProfile
          modalActive={modalActive}
          titleModal="Edit Profile"
          textBtnModal="Save"
          handleCloseMmdal={() => setModalActive(!modalActive)}
          currentUser={currentUser ? currentUser : null}
        >
          <EdidProfile currentUser={currentUser} />
        </ModalEditProfile>
      </EditProfileProvider>
      <>
        <main className="main">
          <ContentProfile
            isCurrentUser={isCurrentUser === "yes" ? true : false}
            userProfile={
              isCurrentUser === "yes" ? (currentUser as IUserProfile) : (anotherUser as IUserProfile)
            }
            users={users}
            posts={posts}
            loadingPost={loadingPost}
            modalActiveState={{ modalActive, setModalActive }}
            tabState={tabState}
            activeTabState={{ activeTab, setActiveTab }}
          />
        </main>
        <Aside page={privateRoutes.profile.name} />
      </>
      <PopupDeletePost />
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

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  posts: state.postReducer,
});

export default connect(mapStateToProps, { getAllUsersAction, getAllPostAction })(ProfileConnectWithStore);
