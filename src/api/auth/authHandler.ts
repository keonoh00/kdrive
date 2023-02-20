import Cookie from 'js-cookie';
import { axisoInstance } from '..';
import { ILogInRequest, ISignUpRequest } from './type';

class AuthHandler {
  private static instance: AuthHandler;

  constructor() {
    if (!AuthHandler.instance) {
      AuthHandler.instance = this;
    }

    return AuthHandler.instance;
  }

  signUp = async ({ username, password, email, name }: ISignUpRequest) => {
    const response = await axisoInstance.post(
      'users/create-account',
      { username, password, email, name },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      },
    );

    return response.data;
  };

  logIn = async ({ username, password }: ILogInRequest) => {
    const response = await axisoInstance.post(
      'users/login',
      { username, password },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      },
    );

    return response.data;
  };

  logOut = async () => {
    const response = await axisoInstance.post('users/logout', null, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    });

    return response.data;
  };
}

const authHandler = new AuthHandler();

export default authHandler;
