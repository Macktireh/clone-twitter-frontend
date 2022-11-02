import { TRoutesList } from "@/models";
import HomePrivate from "@/pages/private/HomePrivate";
import Bookmarks from "@/pages/private/Bookmarks";
import Explore from "@/pages/private/Explore";
import Lists from "@/pages/private/Lists";
import Messages from "@/pages/private/Messages";
import Notifications from "@/pages/private/Notifications";
import Profile from "@/pages/private/Profile";
import PostDetails from "@/pages/private/PostDetails";
import Follow from "@/pages/private/Follow";
import PeopleConnect from "@/pages/private/PeopleConnect";
import { pathLinkPostDetail, pathLinkProfile } from "@/utils/pathRoute";

export const privateRoutes = {
  home: {
    path: "/home",
    title: "Home | Clone Twitter",
    name: "home",
  },
  explore: {
    path: "/explore",
    title: "explore | Clone Twitter",
    name: "explore",
  },
  notifications: {
    path: "/notifications",
    title: "notifications | Clone Twitter",
    name: "notifications",
  },
  messages: {
    path: "/messages",
    title: "Messages | Clone Twitter",
    name: "messages",
  },
  bookmarks: {
    path: "/bookmark",
    title: "Bookmark | Clone Twitter",
    name: "bookmarks",
  },
  lists: {
    path: "/lists",
    title: "Lists | Clone Twitter",
    name: "lists",
  },
  profile: {
    path: pathLinkProfile(":pseudo"),
    title: "profile | Clone Twitter",
    name: "profile",
  },
  postDetails: {
    path: pathLinkPostDetail(":pseudo", ":postPublicId"),
    title: "post details | Clone Twitter",
    name: "postDetails",
  },
  followers: {
    path: pathLinkProfile(":pseudo") + "/followers",
    title: "followers | Clone Twitter",
    name: "followers",
  },
  following: {
    path: pathLinkProfile(":pseudo") + "/following",
    title: "following | Clone Twitter",
    name: "following",
  },
  peopleConnect: {
    path: "/i/connect-people",
    title: "Connect | Clone Twitter",
    name: "peopleConnect",
  },
};

export const privateRoutesList: TRoutesList[] = [
  { path: privateRoutes.home.path, element: <HomePrivate /> },
  { path: privateRoutes.explore.path, element: <Explore /> },
  { path: privateRoutes.notifications.path, element: <Notifications /> },
  { path: privateRoutes.messages.path, element: <Messages /> },
  { path: privateRoutes.bookmarks.path, element: <Bookmarks /> },
  { path: privateRoutes.lists.path, element: <Lists /> },
  { path: privateRoutes.profile.path, element: <Profile /> },
  { path: privateRoutes.postDetails.path, element: <PostDetails /> },
  { path: privateRoutes.followers.path, element: <Follow title="People following" followActive={1} /> },
  { path: privateRoutes.following.path, element: <Follow title="People followed by" followActive={2} /> },
  { path: privateRoutes.peopleConnect.path, element: <PeopleConnect /> },
];
