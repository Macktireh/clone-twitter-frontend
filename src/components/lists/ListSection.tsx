import React from "react";

const ListSection: React.FC = () => {
  return (
    <div className="ListSection FavoriteSection">
      <h2>Your Lists</h2>
      <div className="favorite-empty-box">
        <p>You haven't created or followed any Lists. When you do, they'll show up here.</p>
      </div>
    </div>
  );
};

export default ListSection;