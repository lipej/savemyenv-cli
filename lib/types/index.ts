export type AuthResponse = {
  dbSecret: string;
  subscription: string;
};

export type PartialPackageJSON = {
  name: string;
};

export type EnvResponse = {
  envData: string;
};

export type TokenResponse = {
  authToken: string;
};

export type User = {
  usr: string;
  pass: string;
  mail: string;
};

export type UserLogin = Omit<User, "mail">;
