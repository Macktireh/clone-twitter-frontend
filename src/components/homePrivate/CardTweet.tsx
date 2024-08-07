import React from "react";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";

import IconSVG from "@/widgets/IconSVG";
import LikePostButton from "@/components/homePrivate/LikePostButton";
import PopupPostOrCommentOptionCard from "@/components/homePrivate/PopupPostOptionCard";
import TooltipCardUser from "@/components/homePrivate/TooltipCardUser";
import ButtonAddComment from "@/components/postDetails/ButtonAddComment";
import BookmarkButton from "@/components/bookmark/BookmarkButton";
import { IUserProfile, IPost } from "@/models";
import { dateParserCreated, timeSince } from "@/utils/dateParser";
import { pathLinkPostDetail, pathLinkProfile } from "@/utils/pathRoute";

type propsTypes = {
  currentUser: IUserProfile | null;
  post: IPost | null;
  users: IUserProfile[] | null;
  disabledTooltipImage?: boolean;
};

const CardTweet: React.FC<propsTypes> = ({ currentUser, post, users, disabledTooltipImage }) => {
  const [authorPost, setAuthorPost] = React.useState<IUserProfile | null>();
  const [tweet, setTweet] = React.useState<IPost | null>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser && post && users) {
      if (post.authorDetail.public_id === currentUser.user.public_id) {
        setAuthorPost(currentUser);
      } else {
        setAuthorPost(users.find((u) => u.user.public_id === post.authorDetail.public_id));
      }
      setTweet(post);
    }
  }, [currentUser, post, tweet, users]);

  return (
    <div className="CardTweet">
      <div
        className="click"
        onClick={() => tweet && authorPost && navigate(pathLinkPostDetail(authorPost.pseudo, tweet.publicId))}
      ></div>
      <div className="box-img">
        {!authorPost ? (
          <div className="skeleton-anim"></div>
        ) : (
          <Tippy
            content={<TooltipCardUser authorPost={authorPost} currentUser={currentUser} />}
            interactive={true}
            delay={0}
            hideOnClick={false}
            disabled={disabledTooltipImage ? true : false}
          >
            <div className="tooltip" tabIndex={0}>
              <Link to={pathLinkProfile(authorPost.pseudo)}>
                <img src={`${authorPost.profilePicture}`} alt="" />
              </Link>
            </div>
          </Tippy>
        )}
      </div>
      <div className="post-main">
        <div className="post-header">
          {!authorPost ? (
            <div className="skeleton-anim"></div>
          ) : (
            <p>
              <Link to={pathLinkProfile(authorPost.pseudo)}>
                <strong>{`${authorPost.user.first_name} ${authorPost.user.last_name}`}</strong>
              </Link>
              <Link to={pathLinkProfile(authorPost.pseudo)}>
                <span>@{authorPost.pseudo}</span>
              </Link>
              <span>·</span>
              <span>{tweet?.created && `${timeSince(dateParserCreated(tweet.created))} ago`}</span>
            </p>
          )}
          <Tippy
            content={
              <PopupPostOrCommentOptionCard type="post" post={tweet as IPost} currentUser={currentUser} />
            }
            interactive={true}
            trigger="click"
            delay={0}
            placement="top-end"
          >
            <div className="option" tabIndex={0}>
              <IconSVG iconName="3-dot" fill="#919090" />
            </div>
          </Tippy>
        </div>
        <div className="post-content">
          {tweet ? (
            <>
              {tweet.body && (
                <div className="post-text">
                  <p>{tweet.body}</p>
                </div>
              )}
              {tweet.image && (
                <div className="post-img" style={{ display: disabledTooltipImage ? "none" : "block" }}>
                  <img
                    src={tweet.image}
                    // src={tweet.image.includes(baseURL as string) ? tweet.image : baseURL + tweet.image}
                    alt=""
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="skeleton-anim body"></div>
              <div className="skeleton-anim body"></div>
              <div className="skeleton-anim body"></div>
              <div className="skeleton-anim image"></div>
            </>
          )}
          <div className="post-footer" style={{ display: disabledTooltipImage ? "none" : "flex" }}>
            <ButtonAddComment post={tweet as IPost} isDisplayNumComments={true} />
            <div className="retweet post-icon">
              <IconSVG iconName="retweet" fill="#919090" />
              <span>18</span>
            </div>
            <LikePostButton
              type="post"
              currentUser={currentUser}
              post={tweet as IPost}
              isDisplayNumLike={true}
            />
            <BookmarkButton currentUser={currentUser} post={tweet as IPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTweet;
