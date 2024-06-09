const parseNumber = (number, defaultNumber) => {
  const isString = typeof number === 'string';

  if (!isString) return defaultNumber;

  const parseNumber = parseInt(number);
  if (Number.isNaN(parseNumber)) {
    return defaultNumber;
  }

  return parseNumber;
};

export const parsePaginationPrams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
