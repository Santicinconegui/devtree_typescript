export type User = {
  handle: string;
  name: string;
  password: string;
  email: string;
  _id: string;
  description: string;
  image: string;
  links: string;
};

export type RegisterCredentials = Pick<User, 'handle' | 'name' | 'email'> & {
  password: string;
  password_confirmation: string;
};

export type LoginCredentials = Pick<User, 'email'> & {
  password: string;
};
export type ProfileForm = Pick<User, 'handle' | 'description'>;

export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>;
