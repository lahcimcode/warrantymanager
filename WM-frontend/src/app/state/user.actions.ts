import { User } from 'src/api/models';
import { UserVariables } from '../main/model/user-variables';

export class RegisterUserAction {
  static readonly type = '[User] RegisterUserAction';
  constructor(public user: User) { }
}

export class LoginAction {
  static readonly type = '[User] LoginAction';
  constructor(public email: string, public password: string, public rememberMe?: boolean) { }
}

export class GetCurrentUserAction {
  static readonly type = '[User] GetCurrentUserAction';
  constructor() { }
}

export class UpdateTokenAction {
  static readonly type = '[User] UpdateTokenAction';
  constructor(public token: string) { }
}

export class LogoutAction {
  static readonly type = '[User] LogoutAction';
  constructor() { }
}

export class DeleteCurrentUserAction {
  static readonly type = '[User] DeleteCurrentUserAction';
  constructor() { }
}


export class GetTokenFromCookieAction {
  static readonly type = '[User] GetTokenFromCookieAction';
  constructor() { }
}

export class SetUserVariableAction {
  static readonly type = '[User] SetUserVariableAction';
  constructor(public userVariables: UserVariables) { }
}