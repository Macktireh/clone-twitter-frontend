import { TRoutesList } from "@/models";
import AllTweet from "@/pages/tweet/AllTweet";

export const tweetRoutes = {
  home: {
    path: "/home/",
    title: "Home | Clone Twitter",
  },
};

export const tweetRoutesList: TRoutesList[] = [
  { path: tweetRoutes.home.path, element: <AllTweet /> },
];
