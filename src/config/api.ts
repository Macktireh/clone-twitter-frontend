/***
 * Endpoint Auth
 */
export const signupEndpoint : string = "/api/auth/user/signup/"
export const accountActivationEndpoint : string = "/api/auth/user/account/activation/"
export const loginEndpoint : string = "/api/auth/user/login/"
export const requestResetPasswordEndpoint : string = "/api/auth/user/request/reset-password/"
export const resetPasswordEndpoint : string = "/api/auth/user/reset-password"
export const verifyTokenEndpoint : string = "/api/auth/user/jwt/verify/"
export const refreshTokenEndpoint : string = "/api/auth/user/token/refresh/"
export const logoutEndpoint : string = "/api/auth/user/logout/"


/***
 * Endpoint User
 */
export const currentUserEndpoint : string = "/api/users/me/"
export const allUserEndpoint : string = "/api/users/"


/***
 * Endpoint Post and likePost
 */
export const postEndpoint : string = "/api/posts/"
export const likePostEndpoint : string = "/api/posts/likes/"
export const listPostsLikes : string = "/api/posts/list/likes/"


/***
 * Endpoint Comment and likeComment
 */
export const commentEndpoint : string = "/api/comments/"
export const likeCommentEndpoint : string = "/api/comments/likes/"