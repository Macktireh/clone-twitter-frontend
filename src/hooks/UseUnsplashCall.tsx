// import React from "react";
import axios from "axios";

const useUnsplashCall = async () => {

  const accessKeyUnsplash = process.env.REACT_APP_ACCESS_KEY_UNSPLASH;
  try {
    const res = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=${accessKeyUnsplash}`
    );
  
    return await {
      urls: res.data.urls,
      tags: {
        title: res.data.tags.source.title,
        subtitle: res.data.tags.source.subtitle,
        description: res.data.tags.source.description,
      },
    };
  } catch (error) {
    return await {
      urls: null,
      tags: {
        title: null,
        subtitle: null,
        description: null,
      },
    };
  }
  

};

export default useUnsplashCall;
