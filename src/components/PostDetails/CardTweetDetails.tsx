import React from "react";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";

import LikePostButton from "@/components/homePrivate/LikePostButton";
import PopupPostOrCommentOptionCard from "@/components/homePrivate/PopupPostOptionCard";
import TooltipCardUser from "@/components/homePrivate/TooltipCardUser";
import AddTweetReply from "@/components/PostDetails/AddTweetReply";
import IconSVG from "@/widgets/IconSVG";
import { IUserProfile, IPost } from "@/models";
import { baseURL } from "@/config/axios";
import { dateParserCustom } from "@/utils/dateParser";
import { pathLinkProfile } from "@/utils/pathRoute";

type propsTypes = {
  currentUser: IUserProfile | null;
  postDetails: IPost | null;
  authorPost: IUserProfile | null;
};

const CardTweetDetails: React.FC<propsTypes> = ({ currentUser, postDetails, authorPost }) => {
  return (
    <div className="CardTweetDetails">
      <div className="header-postDetails">
        <div className="profile">
          {!authorPost ? (
            <div className="skeleton-anim-img-profile"></div>
          ) : (
            <Tippy
              content={<TooltipCardUser authorPost={authorPost} currentUser={currentUser} />}
              interactive={true}
              delay={0}
              hideOnClick={false}
              placement="top"
            >
              <div className="tooltip">
                <Link to={pathLinkProfile(authorPost.pseudo)}>
                  <img src={`${baseURL}${authorPost.profilePicture}`} alt="" />
                </Link>
              </div>
            </Tippy>
          )}
          <div className="username">
            {!authorPost ? (
              <>
                <div className="skeleton-anim"></div>
                <div className="skeleton-anim"></div>
              </>
            ) : (
              <>
                <Link to={pathLinkProfile(authorPost?.pseudo as string)}>
                  <strong>
                    {authorPost?.user.first_name} {authorPost?.user.last_name}
                  </strong>
                </Link>
                <Link to={pathLinkProfile(authorPost?.pseudo as string)}>
                  <span>@{authorPost?.pseudo}</span>
                </Link>
              </>
            )}
          </div>
        </div>
        <Tippy
          content={
            <PopupPostOrCommentOptionCard type="comment" post={postDetails} currentUser={currentUser} />
          }
          interactive={true}
          trigger="click"
          delay={0}
          placement="top-end"
        >
          <div className="option">
            <IconSVG iconName="3-dot" fill="#919090" />
          </div>
        </Tippy>
      </div>
      <div className="content">
        {postDetails ? (
          <>
            {postDetails.body && (
              <div className="post-text">
                <p>{postDetails.body}</p>
              </div>
            )}

            {postDetails.image && (
              <div className="post-img">
                <img
                  src={
                    postDetails.image.includes(baseURL as string)
                      ? postDetails.image
                      : baseURL + postDetails.image
                  }
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
      </div>
      <div className="date-create">
        {!postDetails ? (
          <div className="skeleton-anim"></div>
        ) : (
          <p>
            <Link to="">
              {dateParserCustom(postDetails.created, { hour: "numeric", minute: "numeric" }).split(",")[1]}
            </Link>
            <span></span>
            <Link to="">
              {dateParserCustom(postDetails.created, { year: "numeric", month: "short", day: "numeric" })}
            </Link>
            <span></span>
            <Link to="">Twitter Web App</Link>
          </p>
        )}
      </div>
      <div className="line"></div>
      <div className="stats">
        <p>
          <strong>{postDetails?.comments.length}</strong> Retweets
        </p>
        <p>
          <strong>527</strong> Quote Tweets
        </p>
        <p>
          <strong>{postDetails?.liked.length}</strong> Likes
        </p>
      </div>
      <div className="line"></div>
      <div className="icons">
        <div className="reply post-icon">
          <IconSVG iconName="reply" fill="#919090" />
        </div>
        <div className="retweet post-icon">
          <IconSVG iconName="retweet" fill="#919090" />
        </div>
        <LikePostButton currentUser={currentUser} post={postDetails} isDisplayNumLike={false} />
        <div className="share post-icon">
          <IconSVG iconName="share" fill="#919090" />
        </div>
      </div>
      <div className="line"></div>
      <div className="add-new-comment">
        <AddTweetReply nameClass="textarea-3" />
      </div>
    </div>
  );
};

export default CardTweetDetails;
