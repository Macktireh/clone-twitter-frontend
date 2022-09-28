import React from "react";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";

import IconSVG from "@/widgets/IconSVG";
import LikePostButton from "@/components/homePrivate/LikePostButton";
import PopupPostOrCommentOptionCard from "@/components/homePrivate/PopupPostOptionCard";
import TooltipCardUser from "@/components/homePrivate/TooltipCardUser";
import { IUserProfile, IPost } from "@/models";
import { baseURL } from "@/config/axios";
import { dateParserCreated } from "@/utils/dateParser";
import { pathLinkProfile } from "@/utils/pathRoute";

type PropsType = {
  currentUser: IUserProfile | null;
  post: IPost | null;
  users: IUserProfile[] | null;
};

const CardTweet: React.FC<PropsType> = ({ currentUser, post, users }) => {
  const [authorPost, setAuthorPost] = React.useState<IUserProfile | null>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser && post && users) {
      if (post.authorDetail.public_id === currentUser.user.public_id) {
        setAuthorPost(currentUser);
      } else {
        setAuthorPost(users.find((u) => u.user.public_id === post.authorDetail.public_id));
      }
    }
  }, [currentUser, post, users]);

  return (
    <div className="CardTweet">
      <div className="click" onClick={() => navigate(`/${authorPost?.pseudo}/status/${post?.publicId}`)}></div>
      <div className="box-img">
        <Tippy
          content={<TooltipCardUser currentUser={authorPost} />}
          interactive={true}
          delay={0}
          hideOnClick={false}
          placement="top-end"
        >
          <div>
            <Link to={pathLinkProfile(authorPost?.pseudo as string)}>
              <img src={`${baseURL}${authorPost?.profilePicture}`} alt="" />
            </Link>
          </div>
        </Tippy>
      </div>
      <div className="post-main">
        <div className="post-header">
          <p>
            <Link to={pathLinkProfile(authorPost?.pseudo as string)}>
              <strong>{`${authorPost?.user.first_name} ${authorPost?.user.last_name}`}</strong>
            </Link>
            <Link to={pathLinkProfile(authorPost?.pseudo as string)}>
              <span>@{authorPost?.pseudo}</span>
            </Link>
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
