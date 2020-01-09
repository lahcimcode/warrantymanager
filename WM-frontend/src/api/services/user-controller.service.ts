/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { User } from '../models/user';

/**
 * User Controller
 */
@Injectable({
  providedIn: 'root',
})
class UserControllerService extends __BaseService {
  static readonly getAuthenticatedUserUsingGETPath = '/api/user';
  static readonly deleteAuthenticatedUserUsingDELETEPath = '/api/user';
  static readonly activateUserUsingGETPath = '/api/user/activateuser';
  static readonly createUserUsingPOSTPath = '/api/user/new';
  static readonly updateUserUsingPUTPath = '/api/user/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getAuthenticatedUserUsingGETResponse(): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @return OK
   */
  getAuthenticatedUserUsingGET(): __Observable<User> {
    return this.getAuthenticatedUserUsingGETResponse().pipe(
      __map(_r => _r.body as User)
    );
  }
  deleteAuthenticatedUserUsingDELETEResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  deleteAuthenticatedUserUsingDELETE(): __Observable<null> {
    return this.deleteAuthenticatedUserUsingDELETEResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param activationCode activationCode
   * @return OK
   */
  activateUserUsingGETResponse(activationCode: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (activationCode != null) __params = __params.set('activationCode', activationCode.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/user/activateuser`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * @param activationCode activationCode
   * @return OK
   */
  activateUserUsingGET(activationCode: string): __Observable<boolean> {
    return this.activateUserUsingGETResponse(activationCode).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param user user
   * @return OK
   */
  createUserUsingPOSTResponse(user: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = user;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/user/new`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param user user
   * @return OK
   */
  createUserUsingPOST(user: User): __Observable<User> {
    return this.createUserUsingPOSTResponse(user).pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * @param params The `UserControllerService.UpdateUserUsingPUTParams` containing the following parameters:
   *
   * - `user`: user
   *
   * - `id`: id
   *
   * @return OK
   */
  updateUserUsingPUTResponse(params: UserControllerService.UpdateUserUsingPUTParams): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.user;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/user/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param params The `UserControllerService.UpdateUserUsingPUTParams` containing the following parameters:
   *
   * - `user`: user
   *
   * - `id`: id
   *
   * @return OK
   */
  updateUserUsingPUT(params: UserControllerService.UpdateUserUsingPUTParams): __Observable<User> {
    return this.updateUserUsingPUTResponse(params).pipe(
      __map(_r => _r.body as User)
    );
  }
}

module UserControllerService {

  /**
   * Parameters for updateUserUsingPUT
   */
  export interface UpdateUserUsingPUTParams {

    /**
     * user
     */
    user: User;

    /**
     * id
     */
    id: number;
  }
}

export { UserControllerService }
