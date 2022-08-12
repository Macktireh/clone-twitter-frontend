import * as React from "react";

import Layout from "@/Layout/Layout";

const AllTweet: React.FC = () => {
  React.useEffect(() => {
    document.title = "Home | Clone Twitter";
  });
  return (
    <Layout>
      <div className="home-tweet">
        <h1>Les posts...</h1>
      </div>
    </Layout>
  );
};

export default AllTweet;
