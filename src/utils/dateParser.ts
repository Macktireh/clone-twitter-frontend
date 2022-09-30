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
  return newDate.replace(',', '');
};


export const dateParserJoined = (date: string) => {
  let newDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  return newDate.replace('.', '');
};