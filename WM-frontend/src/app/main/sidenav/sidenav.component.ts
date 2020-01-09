import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/api/models';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {


  haveAccount: boolean;

  constructor() { }

  @Select(state => state.user.token)
  token$: Observable<string>;

  @Select(state => state.user.currentUser)
  currentUser$: Observable<User>;

  @Select(state => state.user.emailRegistration)
  emailRegistration$: Observable<string>;

  @Select(state => state.user.errorMessage)
  errorMessage$: Observable<string>;

  ngOnInit() {
    this.haveAccount = true;
  }

  loginOrRegister(event) {
    this.haveAccount = event;
  }

    

}
