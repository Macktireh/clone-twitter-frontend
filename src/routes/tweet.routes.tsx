import { TRoutesList } from "@/models";
import AllTweet from "@/pages/tweet/AllTweet";
import Bookmarks from "@/pages/tweet/Bookmarks";
import Explore from "@/pages/tweet/Explore";
import Lists from "@/pages/tweet/Lists";
import Messages from "@/pages/tweet/Messages";
import Notifications from "@/pages/tweet/Notifications";
import Profile from "@/pages/tweet/Profile";

export const tweetRoutes = {
  home: {
    path: "/home",
    title: "Home | Clone Twitter",
  },
  explore: {
    path: "/explore",
    title: "explore | Clone Twitter",
  },
  notifications: {
    path: "/notifications",
    title: "notifications | Clone Twitter",
  },
  messages: {
    path: "/messages",
    title: "Messages | Clone Twitter",
  },
  bookmarks: {
    path: "/bookmark",
    title: "Bookmark | Clone Twitter",
  },
  lists: {
    path: "/lists",
    title: "Lists | Clone Twitter",
  },
  profile: {
    path: "/profile",
    title: "profile | Clone Twitter",
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
