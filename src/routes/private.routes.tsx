import { TRoutesList } from "@/models";
import HomePrivate from "@/pages/private/HomePrivate";
import Bookmarks from "@/pages/private/Bookmarks";
import Explore from "@/pages/private/Explore";
import Lists from "@/pages/private/Lists";
import Messages from "@/pages/private/Messages";
import Notifications from "@/pages/private/Notifications";
import Profile from "@/pages/private/Profile";
import { pathLinkPostDetail, pathLinkProfile } from "@/utils/pathRoute";
import PostDetails from "@/pages/private/PostDetails";
import Follow from "@/pages/private/Follow";

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
  { path: privateRoutes.followers.path, element: <Follow followActive={1} /> },
  { path: privateRoutes.following.path, element: <Follow followActive={2} /> },
];
