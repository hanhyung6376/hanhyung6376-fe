export const parseQueryString = (search: string): Record<string, string> =>
  (search || '')
    .replace(/^\?/g, '')
    .split('&')
    .reduce((acc, query) => {
      const [key, value] = query.split('=');

      if (key) {
        acc[key] = decodeURIComponent(value);
      }

      return acc;
    }, {} as Record<string, string>);

export const queryStringToNumber = (qs: string | string[] | undefined) => {
  if (!qs) return null;

  const number = Number(qs as string);

  if (Number.isInteger(number) && number >= 1) {
    return number;
  } else {
    return null;
  }
};
