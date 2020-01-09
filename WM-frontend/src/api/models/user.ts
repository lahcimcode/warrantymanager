/* tslint:disable */
import { Role } from './role';
export interface User {
  activationCode?: string;
  active?: boolean;
  avatar?: string;
  city?: string;
  createdDate?: string;
  email?: string;
  firstName?: string;
  id?: number;
  lastModifiedDate?: string;
  lastName?: string;
  mobileNumber?: string;
  password?: string;
  postalCode?: string;
  role?: Role;
  signature?: string;
  street?: string;
}
