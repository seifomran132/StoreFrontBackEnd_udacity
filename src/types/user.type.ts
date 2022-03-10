export type user = {
  firstname: string;
  lastname: string;
  password: string;
};
export type createdUser = {
  user: user;
  token: string;
};
