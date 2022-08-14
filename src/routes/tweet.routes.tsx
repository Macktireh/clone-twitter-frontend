import { TRoutesList } from "@/models";
import AllTweet from "@/pages/private/News";
import Bookmarks from "@/pages/private/Bookmarks";
import Explore from "@/pages/private/Explore";
import Lists from "@/pages/private/Lists";
import Messages from "@/pages/private/Messages";
import Notifications from "@/pages/private/Notifications";
import Profile from "@/pages/private/Profile";

export const tweetRoutes = {
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
    path: "/profile",
    title: "profile | Clone Twitter",
    name: "profile",
  },
};

export const tweetRoutesList: TRoutesList[] = [
  { path: tweetRoutes.home.path, element: <AllTweet /> },
  { path: tweetRoutes.explore.path, element: <Explore /> },
  { path: tweetRoutes.notifications.path, element: <Notifications /> },
  { path: tweetRoutes.messages.path, element: <Messages /> },
  { path: tweetRoutes.bookmarks.path, element: <Bookmarks /> },
  { path: tweetRoutes.lists.path, element: <Lists /> },
  { path: tweetRoutes.profile.path, element: <Profile /> },
];
