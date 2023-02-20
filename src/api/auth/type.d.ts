export interface ISignUpRequest {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface ISignUpSuccessResponse {
  avatar: string;
  date_joined: string;
  email: string;
  id: number;
  last_login: null;
  name: string;
  username: string;
}

export interface ILogInRequest {
  username: string;
  password: string;
}

export interface ILogInSuccessResponse {
  ok: string;
}
