import { UserState } from './../../state/user.state';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { User } from 'src/api/models';
import { DeleteCurrentUserAction } from 'src/app/state/user.actions';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser: User;
  accountForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.currentUser = this.store.selectSnapshot(UserState.getCurrentUser);
    console.log(this.currentUser);
    
    this.accountForm = this.formBuilder.group({
      firstName: [this.currentUser.firstName, [Validators.required], ],
      lastName: [this.currentUser.lastName, [Validators.required]]
    })
  }

  deleteAccount() {
    console.log('DeleteAccountFunction');
    this.store.dispatch(new DeleteCurrentUserAction());
  }

}
