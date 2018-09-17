import {Role} from './role';

export class UserPrincipal {
  accessToken: string;
  tokenType: string;
  name: string;
  surname: string;
  roles: Role[];
  username: string;
}
