export const pathLinkProfile = (pseudo: string): string => {
  return `/${pseudo}`;
};

export const pathLinkPostDetail = (pseudo: string, postPublicId: string): string => {
  return `/${pseudo}/status/${postPublicId}`;
};