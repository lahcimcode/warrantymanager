import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { LoginAction, SetUserVariableAction } from 'src/app/state/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginError: string = null;
  passwordVisiblity: boolean = false;
  rememberMe: boolean = false;

  @Output()
  loginOrRegister = new EventEmitter();

  @Select(state => state.user.errorMessage)
  errorMessage$: Observable<string>;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetUserVariableAction({errorMessage: null}));
  }

  getErrorMessage(field: string) {
    if (field === 'email') {
      if (this.loginForm.get('email').hasError('required')) {
        return 'login.errorMessages.email.required';
      }
      if (this.loginForm.get('email').hasError('email')) {
        return 'login.errorMessages.email.email';
      }
    }
    if (field === 'password') {
      if (this.loginForm.get('password').hasError('required')) {
        return 'login.errorMessages.password.required';
      }
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(new LoginAction(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value,
      ))
    } else {
      this.loginError = 'login.errorMessages.verification.validation';
    }
  }

  redirectRegister() {
    this.loginOrRegister.emit(false);
  }





}
