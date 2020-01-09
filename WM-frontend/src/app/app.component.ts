import { IconImport } from './main/service/iconImport';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LogoutAction } from './state/user.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'WM-frontend';

  constructor(private translateService: TranslateService, private iconImport: IconImport, private store: Store) { }

  @Select(state => state.user.token)
  token$: Observable<string>;

  ngOnInit(): void {
    this.translateService.addLangs(["pl", "en"]);
    this.translateService.use('pl');
    this.translateService.setDefaultLang('pl');

    this.iconImport.iconInitializer();
  }

  changeLanguage(value) {
    this.translateService.use(value); 
  }

  logout() {
    this.store.dispatch(new LogoutAction());   
  }


}




