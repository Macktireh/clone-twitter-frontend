import React from "react";

const FavoriteSection: React.FC = () => {
  return (
    <div className="FavoriteSection">
      <h2>Pinned Lists</h2>
      <div className="favorite-empty-box">
        <p>Nothing to see here yet — pin your favorite Lists to access them quickly.</p>
      </div>
    </div>
  );
};

export default FavoriteSection;
