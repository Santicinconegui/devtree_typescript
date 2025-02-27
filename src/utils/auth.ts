import brcypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await brcypt.genSalt(10);
  return await brcypt.hash(password, salt);
};

export const checkPassword = async (enteredPassword: string, hash: string) => {
  return await brcypt.compare(enteredPassword, hash);
};
