import { User } from 'src/api/models';

export interface UserVariables {
    token?: string;
    currentUser?: User;
    errorMessage?: string;
    emailRegistration?: string;
  }