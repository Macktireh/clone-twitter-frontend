/***
 * Endpoint Auth
 */
export const signupEndpoint : string = "/api/auth/user/signup/"
export const accountActivationEndpoint : string = "/api/auth/user/account/activation/"
export const loginEndpoint : string = "/api/auth/user/login/"
export const requestResetPasswordEndpoint : string = "/api/auth/user/request/reset-password/"
export const resetPasswordEndpoint : string = "/api/auth/user/reset-password/"
export const verifyTokenEndpoint : string = "/api/auth/user/jwt/verify/"
export const refreshTokenEndpoint : string = "/api/auth/user/token/refresh/"
export const logoutEndpoint : string = "/api/auth/user/logout/"
export const googleLoginEndpoint : string = "/api/auth/user/login/google/"


/***
 * Endpoint User
 */
export const currentUserEndpoint : string = "/api/users/me/"
export const allUserEndpoint : string = "/api/users/"


/***
 * Endpoint Post and likePost
 */
export const postEndpoint : string = "/api/posts/"
export const postDeleteEndpoint : string = "/api/posts/delete/"
export const likePostEndpoint : string = "/api/posts/likes/"
export const listPostsLikes : string = "/api/posts/likes/"


/***
 * Endpoint Comment and likeComment
 */
export const commentEndpoint : string = "/api/comments/"
export const commentDeleteEndpoint : string = "/api/comments/delete/"
export const likeCommentEndpoint : string = "/api/comments/likes/"


/***
 * Endpoint Following and Followers
 */
export const followingEndpoint : string = "/api/follow/following/"
export const followersEndpoint : string = "/api/follow/followers/"
export const peopleConnectEndpoint : string = "/api/follow/people-connect/"


/***
 * Endpoint Notifications
 */
export const notificationEndpoint : string = "/api/notifications/"
export const notificationSeenEndpoint : string = "/api/notifications/seen/"


/***
 * Endpoint Notifications Messages
 */
export const messagesEndpoint : string = "/api/chat/"
export const noficationMessagesEndpoint : string = "/api/chat/messages/notifications/"


/***
 * Endpoint Bookmark
 */
export const bookmarksEndpoint : string = "/api/bookmarks/"