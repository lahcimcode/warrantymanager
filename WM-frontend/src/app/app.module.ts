import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './main/login/login.component';
import { SidenavComponent } from './main/sidenav/sidenav.component';
import { RegisterComponent } from './main/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderComponent } from './main/header/header.component';

import { UserState } from './state/user.state';
import { AccountComponent } from './main/account/account.component';
import { IconImport } from 'src/app/main/service/iconImport';
import { MailActivationComponent } from './main/notification/mail-activation/mail-activation.component';
import { ErrorComponent } from './main/notification/error/error.component';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { UserActivateComponent } from './main/notification/user-activate/user-activate.component';
import { TokenInterceptor } from './service/token-interceptor';
import { ErrorInterceptor } from './service/error-interceptor';
import { UserDeleteComponent } from './main/notification/user-delete/user-delete.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    AccountComponent,
    MailActivationComponent,
    ErrorComponent,
    UserActivateComponent,
    UserDeleteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxsModule.forRoot([UserState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule


  ],
  providers: [IconImport,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}