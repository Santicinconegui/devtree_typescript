import brcypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await brcypt.genSalt(10);
  return await brcypt.hash(password, salt);
};
