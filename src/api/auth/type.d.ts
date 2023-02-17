export interface ISignUpRequest {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface ISignUpSuccessResponse {}

export interface ISignupFailResponse {}

export interface ILogInRequest {
  username: string;
  password: string;
}

export interface ILogInSuccessResponse {
  ok: string;
}

export interface ILogInFailResponse {
  error: string;
}
