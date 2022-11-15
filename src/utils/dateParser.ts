export const dateParserCustom = (date: Date, dict: any) => {
  return new Date(date).toLocaleDateString("en-US", dict);
  // return newDate.replace(',', '');
};

export const dateParserCreated = (date: Date) => {
  let newDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return newDate.replace(",", "");
};

export const dateParserJoined = (date: string) => {
  let newDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  return newDate.replace(".", "");
};

export const timeSince = function (d: string) {
  if (typeof d !== "object") {
    const date: any = new Date(d);
    const now: any = new Date()

    const seconds = Math.floor((now - date) / 1000);
    let intervalType;

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = "année";
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = "mois";
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = "jour";
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "heure";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "seconde";
            }
          }
        }
      }
    }

    if (interval > 1 || interval === 0) {
      intervalType += "s";
    }

    return interval + " " + intervalType;
  }
};
