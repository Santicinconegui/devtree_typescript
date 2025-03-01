export type User = {
  handle: String;
  name: String;
  password: String;
  email: String;
};

export type RegisterCredentials = Pick<User, 'handle' | 'name' | 'email'> & {
  password: String;
  password_confirmation: String;
};
