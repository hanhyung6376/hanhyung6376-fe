const hasSmall = (value: string) => new RegExp(/[a-z]/).test(value);
const hasLarge = (value: string) => new RegExp(/[A-Z]/).test(value);
const hasNumber = (value: string) => new RegExp(/[0-9]/).test(value);
const hasMixed = (value: string) => new RegExp(/^[A-Za-z0-9_]*$/).test(value);

export const checkId = (id: string) => {
  if (id.length < 5 || id.length > 30) {
    return;
  }
  if (!hasMixed(id)) {
    return;
  }

  return true;
};

export const checkPassword = (password: string) => {
  const result = hasSmall(password) && hasLarge(password) && hasNumber(password);
  if (password.length < 8 || password.length > 30) {
    return;
  }

  if (!result) {
    return;
  }

  return true;
};
