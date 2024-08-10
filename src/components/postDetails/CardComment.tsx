import React from "react";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";

import IconSVG from "@/widgets/IconSVG";
import LikePostButton from "@/components/homePrivate/LikePostButton";
import PopupPostOrCommentOptionCard from "@/components/homePrivate/PopupPostOptionCard";
import TooltipCardUser from "@/components/homePrivate/TooltipCardUser";
import { IUserProfile, IComment } from "@/models";
// import { baseURL } from "@/config/axios";
import { dateParserCreated, timeSince } from "@/utils/dateParser";
import { pathLinkProfile } from "@/utils/pathRoute";

type propsTypes = {
  currentUser: IUserProfile | null;
  comment: IComment | null;
  users: IUserProfile[] | null;
};

const CardComment: React.FC<propsTypes> = ({ currentUser, comment, users }) => {
  const [authorPost, setAuthorPost] = React.useState<IUserProfile | null>();
  const [ReTweet, setReTweet] = React.useState<IComment | null>();

  React.useEffect(() => {
    if (currentUser && comment && users) {
      if (comment.authorDetail.public_id === currentUser.user.public_id) {
        setAuthorPost(currentUser);
      } else {
        setAuthorPost(users.find((u) => u.user.public_id === comment.authorDetail.public_id));
      }
      setReTweet(comment);
    }
  }, [currentUser, comment, users]);

  return (
    <div className="CardTweet">
      {/* <div
        className="click"
        onClick={() =>
          authorPost &&
          comment &&
          navigate(
            pathLinkPostDetail(authorPost.pseudo, comment as IComment ? comment.publicId : "")
          )
        }
      ></div> */}
      <div className="box-img">
        {!authorPost ? (
          <div className="skeleton-anim"></div>
        ) : (
          <Tippy
            content={
              <TooltipCardUser
                authorPost={authorPost}
                currentUser={currentUser}
              />
            }
            interactive={true}
            delay={0}
            hideOnClick={false}
            placement="top"
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
              <span>{ReTweet?.created && `${timeSince(dateParserCreated(ReTweet.created))} ago`}</span>
            </p>
          )}
          <Tippy
            content={
              <PopupPostOrCommentOptionCard
                type="comment"
                post={ReTweet as IComment}
                currentUser={currentUser}
              />
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
          {ReTweet ? (
            <>
              {ReTweet.message && (
                <div className="post-text">
                  <p>{ReTweet.message}</p>
                </div>
              )}

              {ReTweet.image && (
                <div className="post-img">
                  <img src={ReTweet.image} alt="" />
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
          <div className="post-footer">
            <div className="retweet post-icon">
              <IconSVG iconName="retweet" fill="#919090" />
              <span>18</span>
            </div>
            <LikePostButton
              type="comment"
              currentUser={currentUser}
              post={ReTweet as IComment}
              isDisplayNumLike={true}
              postPublicIdRead={ReTweet?.postPublicIdRead}
            />
            <div className="share post-icon">
              <IconSVG iconName="share" fill="#919090" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComment;
