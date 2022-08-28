import React from "react";

import IconSVG from "@/components/widgets/IconSVG";
import { IAuthUserProfile } from "@/models";
import { baseURL } from "@/api";

type TcurrentUser = { currentUser: IAuthUserProfile | null };

const CardTweet: React.FC<TcurrentUser> = ({ currentUser }) => {
  const [isLiked, setIsLked] = React.useState(false);
  const [numLikes, setNumLikes] = React.useState(111);

  const handlLiked = async () => {
    await setIsLked(!isLiked)
    isLiked ? setNumLikes(numLikes - 1) : setNumLikes(numLikes + 1)
  }

  return (
    <div className="CardTweet">
      <div className="box-img">
        <img
          src={
            currentUser?.profilePicture
              ? baseURL + currentUser.profilePicture
              : baseURL + "/mediafiles/default/profilePic.png"
          }
          alt=""
        />
      </div>
      <div className="post-main">
        <div className="post-header">
          <p>
            <strong>
              {`${currentUser?.user.first_name} ${currentUser?.user.last_name}`}
            </strong>
            <span>@{currentUser?.pseudo}</span>
            <span>·</span>
            <span>Jan 12, 2021</span>
          </p>
          <IconSVG iconName="3-dot" fill="#919090" />
        </div>
        <div className="post-content">
          <div className="post-text">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, doloremque.</p>
          </div>
          <div className="post-img">
            <img src="https://pbs.twimg.com/media/FaEp0V8WYAIHjoh?format=png&name=small" alt="" />
          </div>
          <div className="post-footer">
            <div className="reply post-icon">
              <IconSVG iconName="reply" fill="#919090" />
              <span>10</span>
            </div>
            <div className="retweet post-icon">
              <IconSVG iconName="retweet" fill="#919090" />
              <span>18</span>
            </div>
            <div className="like-unLike post-icon" onClick={() => handlLiked()}>
              {isLiked ? (
                <IconSVG iconName="like" fill="#F91880" handleClick={() => handlLiked()} />
              ) : (
                <IconSVG iconName="unLike" fill="#919090" handleClick={() => handlLiked()} />
              )}
              <span className={isLiked ? "like" : ""} onClick={() => handlLiked()}>{numLikes}</span>
            </div>
            <div className="share post-icon">
              <IconSVG iconName="share" fill="#919090" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTweet;
