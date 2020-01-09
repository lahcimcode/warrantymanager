import { Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UserControllerService } from 'src/api/services';
import { RegisterUserAction, LoginAction, GetTokenFromCookieAction, GetCurrentUserAction, UpdateTokenAction, LogoutAction, DeleteCurrentUserAction, SetUserVariableAction } from './user.actions';
import { map, tap, catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import Cookies from 'js-cookie';
import { User } from 'src/api/models';


export class UserStateModel {

  public token: string;
  public currentUser: User;
  public errorMessage: string;
  public emailRegistration: string;

}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    token: null,
    currentUser: null,
    errorMessage: null,
    emailRegistration: null

  }
})
export class UserState {

  constructor(public userService: UserControllerService, public httpClient: HttpClient) { };

  @Selector()
  static getToken(userStateModel: UserStateModel) {
    return userStateModel.token;
  }

  @Selector()
  static getCurrentUser(userStateModel: UserStateModel) {
    return userStateModel.currentUser;
  }

  @Action(RegisterUserAction)
  registerUser(ctx: StateContext<UserStateModel>, { user }: RegisterUserAction) {
    return this.userService.createUserUsingPOST(user).pipe(
      tap(() => {
        ctx.patchState({ emailRegistration: user.email });
        ctx.dispatch(new Navigate(["/account-confirm"]));
      }),
      catchError((err, caught) => {
        const message = err.error.message;
        if (message === 'Email already exists') {
          ctx.patchState({ errorMessage: 'register.errorMessages.verification.duplicate' })
        }
        return empty();
      })
    )
  }

  @Action(LoginAction)
  login(ctx: StateContext<UserStateModel>, { email, password }: LoginAction) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.httpClient.post<{ token: string }>('http://localhost:8080/login', formData, {}).pipe(
      tap(({ token }) => {
        ctx.patchState({ token: token });
        ctx.dispatch(new GetCurrentUserAction());
        // Cookies.set('token', token, { expires: 1 }) //updatetoken
        // dodać cookie do login i hasło jak zapamieta
      }),
      catchError((err, caught) => {
        const message = err.error.message;
        if (message === 'Unauthorized') {
          ctx.patchState({ errorMessage: 'login.errorMessages.verification.wrongEmailPassword' })
        }
        return empty();
      })
    )
  }

  @Action(GetCurrentUserAction)
  getCurrentUser(ctx: StateContext<UserStateModel>, { }: GetCurrentUserAction) {
    return this.userService.getAuthenticatedUserUsingGET().pipe(
      tap(user => {
        ctx.patchState({ currentUser: user })
      })
    );
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<UserStateModel>, { }: LogoutAction) {
    ctx.patchState({ token: null, currentUser: null });
  }

  @Action(UpdateTokenAction)
  updateToken(ctx: StateContext<UserStateModel>, { token }: UpdateTokenAction) {
    ctx.patchState({ token: token });
  }

  @Action(DeleteCurrentUserAction)
  deleteCurrentUser(ctx: StateContext<UserStateModel>, { }: DeleteCurrentUserAction) {
    console.log('DeleteAccount w STATE');

    return this.userService.deleteAuthenticatedUserUsingDELETE().pipe(
      tap(() => {
        console.log('W TAPie');

        ctx.dispatch(new Navigate(["/account-delete"]));
      })
    )
  }

  @Action(GetTokenFromCookieAction)
  tookenFromCookie(ctx: StateContext<UserStateModel>, { }: GetTokenFromCookieAction) {
    Cookies.get('token')
  }

  @Action(SetUserVariableAction)
  setUserVariables(ctx: StateContext<UserStateModel>, { userVariables }: SetUserVariableAction) {
    ctx.patchState({
      emailRegistration: userVariables.emailRegistration,
      errorMessage: userVariables.errorMessage
    });
  }

}

