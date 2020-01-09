/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UsersGroup } from '../models/users-group';

/**
 * Users Group Controller
 */
@Injectable({
  providedIn: 'root',
})
class UsersGroupControllerService extends __BaseService {
  static readonly createUsersGroupUsingPOSTPath = '/api/usersgroup';
  static readonly getUsersGroupUsingGETPath = '/api/usersgroup/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param usersGroup usersGroup
   * @return OK
   */
  createUsersGroupUsingPOSTResponse(usersGroup: UsersGroup): __Observable<__StrictHttpResponse<UsersGroup>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = usersGroup;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/usersgroup`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UsersGroup>;
      })
    );
  }
  /**
   * @param usersGroup usersGroup
   * @return OK
   */
  createUsersGroupUsingPOST(usersGroup: UsersGroup): __Observable<UsersGroup> {
    return this.createUsersGroupUsingPOSTResponse(usersGroup).pipe(
      __map(_r => _r.body as UsersGroup)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getUsersGroupUsingGETResponse(id: number): __Observable<__StrictHttpResponse<UsersGroup>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/usersgroup/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UsersGroup>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getUsersGroupUsingGET(id: number): __Observable<UsersGroup> {
    return this.getUsersGroupUsingGETResponse(id).pipe(
      __map(_r => _r.body as UsersGroup)
    );
  }
}

module UsersGroupControllerService {
}

export { UsersGroupControllerService }
