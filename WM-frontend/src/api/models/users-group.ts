/* tslint:disable */
import { User } from './user';
export interface UsersGroup {
  admin?: User;
  createdDate?: string;
  id?: number;
  name?: string;
  users?: Array<User>;
}
