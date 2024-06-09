const parseContactType = (unknown) => {
  const isString = typeof unknown === 'string';
  if (!isString) return;

  const isContactType = (unknown) =>
    ['work', 'home', 'personal'].includes(unknown);
  if (isContactType(unknown)) return unknown;
};

const parseIsFavourite = (unknown) => {
  if (!['true', 'false'].includes(unknown)) return;

  return unknown === 'true' ? true : false;
};

export const parseFilterParams = (query) => {
  return {
    contactType: parseContactType(query.contactType),
    isFavourite: parseIsFavourite(query.isFavourite),
  };
};
