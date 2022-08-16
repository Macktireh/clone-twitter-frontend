import * as React from "react";

import IconSVG from "@/components/icon/IconSVG";
import { IAuthUserProfile } from "@/models";

type TcurrentUser = { currentUser: IAuthUserProfile | null };

const CardTweet: React.FC<TcurrentUser> = ({ currentUser }) => {
  const [isLiked, setIsLked] = React.useState(false);

  return (
    <div className="CardTweet">
      <div className="box-img">
        {currentUser?.profilePicture ? (
          <img src={process.env.REACT_APP_API_URL + currentUser.profilePicture} alt="" />
        ) : (
          <IconSVG iconName="profile" />
        )}
      </div>
      <div className="post-main">
        <div className="post-header">
          <p>
            <strong>{currentUser?.user.first_name} {currentUser?.user.last_name}</strong>
            <span>@realpython</span>
            <span>·</span>
            <span>Jan 12, 2021</span>
          </p>
          <IconSVG iconName="point" fill="#919090" />
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
            <div className="like-unLike post-icon">
              {isLiked ? (
                <IconSVG iconName="like" fill="#F91880" handleClick={() => setIsLked(!isLiked)} />
              ) : (
                <IconSVG iconName="unLike" fill="#919090" handleClick={() => setIsLked(!isLiked)} />
              )}
              <span>112</span>
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
