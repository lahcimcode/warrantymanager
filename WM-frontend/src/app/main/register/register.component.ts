import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { RegisterUserAction, SetUserVariableAction } from 'src/app/state/user.actions';
import { Observable, empty } from 'rxjs';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  verification: string = null;

  @Output()
  loginOrRegister = new EventEmitter();

  @Select(state => state.user.errorMessage)
  errorMessage$: Observable<string>;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){6,32}$')]],
      passwordConfirm: ['', [Validators.required]],
      username: ['', [Validators.required]],
      regulations: [false, [Validators.requiredTrue]]
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetUserVariableAction({errorMessage: null}));
  }

  getErrorMessage(field: string) {
    if (field === 'email') {
      if (this.registerForm.get('email').hasError('required')) {
        return 'register.errorMessages.email.required';
      }
      if (this.registerForm.get('email').hasError('email')) {
        return 'register.errorMessages.email.pattern';
      }
    }
    if (field === 'password') {
      if (this.registerForm.get('password').hasError('required')) {
        return 'register.errorMessages.password.required';
      }
      if (this.registerForm.get('password').hasError('minlength')) {
        return 'register.errorMessages.password.minlength';
      }
      if (this.registerForm.get('password').hasError('maxlength')) {
        return 'register.errorMessages.password.maxlength';
      }
      if (this.registerForm.get('password').hasError('pattern')) {
        return 'register.errorMessages.password.pattern';
      }
    }
    if (field === 'passwordConfirm') {
      if (this.registerForm.get('passwordConfirm').hasError('required')) {
        return 'register.errorMessages.passwordConfirm.required';
      }
    }
    if (field === 'username') {
      if (this.registerForm.get('username').hasError('required')) {
        return 'register.errorMessages.username.required';
      }
    }

  }

  loginFormVerification() {
    // console.log('Jestem w weryfikacji');
    // this.userService.isEmailUsingGET(this.registerForm.get('email').value).subscribe((x) => 
    //   console.log(x)
    // ).unsubscribe();    
    if (!this.registerForm.get('regulations').value) {
      this.verification = 'register.errorMessages.verification.regulations';
      return false;
    }
    if (this.registerForm.invalid) {
      this.verification = 'register.errorMessages.verification.validation';
      return false;
    }
    if (this.registerForm.get('password').value != this.registerForm.get('passwordConfirm').value) {
      this.verification = 'register.errorMessages.verification.password';
      return false;
    }
    this.verification = null;
    return true;
  }

  register() {
    if (this.loginFormVerification()) {
      this.store.dispatch(new RegisterUserAction({
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        firstName: this.registerForm.get('username').value
      }));
    }
  }

  redirectLogin() {
    this.loginOrRegister.emit(true);
  }


}
