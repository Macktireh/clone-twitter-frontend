import React from "react";
import Tippy from "@tippyjs/react";

import IconSVG from "@/widgets/IconSVG";
import LikePostButton from "@/components/homePrivate/LikePostButton";
import PopupPostOrCommentOptionCard from "@/components/homePrivate/PopupPostOptionCard";
import { IUserProfile, IPost } from "@/models";
import { baseURL } from "@/config/axios";
import { dateParserCreated } from "@/utils/dateParser";
import { useNavigate } from "react-router-dom";
import { pathLinkProfile } from "@/utils/pathRoute";

type PropsType = {
  currentUser: IUserProfile | null;
  post: IPost | null;
  users: IUserProfile[] | null;
};

const CardTweet: React.FC<PropsType> = ({ currentUser, post, users }) => {
  const navigate = useNavigate();

  return (
    <div className="CardTweet">
      <div className="box-img">
        {currentUser &&
          users &&
          post &&
          (post.authorDetail.public_id === currentUser.user.public_id ? (
            <img
              src={`${baseURL}${currentUser?.profilePicture}`}
              alt=""
              onClick={() => (currentUser ? navigate(pathLinkProfile(currentUser.pseudo)) : "")}
            />
          ) : (
            users.map(
              (u, i) =>
                u.user.public_id === post.authorDetail.public_id && (
                  <img
                    key={i}
                    src={`${baseURL}${u.profilePicture}`}
                    alt=""
                    onClick={() => navigate(pathLinkProfile(u.pseudo))}
                  />
                )
            )
          ))}
      </div>
      <div className="post-main">
        <div className="post-header">
          <p>
            {post &&
              currentUser &&
              (post.authorDetail.public_id === currentUser.user.public_id ? (
                <strong
                  onClick={() => navigate(pathLinkProfile(currentUser.pseudo))}
                >{`${currentUser.user.first_name} ${currentUser.user.last_name}`}</strong>
              ) : (
                users?.map(
                  (u, i) =>
                    u.user.public_id === post?.authorDetail.public_id && (
                      <strong
                        key={i}
                        onClick={() => navigate(pathLinkProfile(u.pseudo))}
                      >{`${post.authorDetail.first_name} ${post.authorDetail.last_name}`}</strong>
                    )
                )
              ))}
            {post &&
              currentUser &&
              (post?.authorDetail.public_id === currentUser?.user.public_id ? (
                <span onClick={() => navigate(pathLinkProfile(currentUser.pseudo))}>
                  @{currentUser?.pseudo}
                </span>
              ) : (
                users?.map(
                  (u, i) =>
                    u.user.public_id === post?.authorDetail.public_id && (
                      <span key={i} onClick={() => navigate(pathLinkProfile(u.pseudo))}>
                        @{u.pseudo}
                      </span>
                    )
                )
              ))}
            <span>·</span>
            <span>{post?.created && dateParserCreated(post.created)}</span>
          </p>
          <Tippy
            content={<PopupPostOrCommentOptionCard type="post" post={post} currentUser={currentUser} />}
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
        <div className="post-content">
          {post?.body && (
            <div className="post-text">
              <p>{post?.body}</p>
            </div>
          )}
          {post?.image && (
            <div className="post-img">
              <img src={post?.image} alt="" />
            </div>
          )}
          <div className="post-footer">
            <div className="reply post-icon">
              <IconSVG iconName="reply" fill="#919090" />
              <span>{post?.comments.length}</span>
            </div>
            <div className="retweet post-icon">
              <IconSVG iconName="retweet" fill="#919090" />
              <span>18</span>
            </div>
            <LikePostButton currentUser={currentUser} post={post} />
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
