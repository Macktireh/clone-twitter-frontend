import * as React from "react";
import Navbar from "../../components/Navbar";

const AllTweet: React.FC = () => {
  React.useEffect(() => {
    document.title = "Home | Clone Twitter";
  });
  return (
    <div className="post-global-container">
      <Navbar />
      <h1>Les posts...</h1>
    </div>
  );
};

export default AllTweet;
