import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetUserVariableAction } from 'src/app/state/user.actions';

@Component({
  selector: 'app-mail-activation',
  templateUrl: './mail-activation.component.html',
  styleUrls: ['./mail-activation.component.css']
})
export class MailActivationComponent implements OnInit, OnDestroy {

  // Check email address from registration proces
  @Select(state => state.user.emailRegistration)
  emailRegistration$: Observable<string>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetUserVariableAction({emailRegistration: null}));
  }

}
