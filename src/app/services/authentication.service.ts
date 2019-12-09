import {EventEmitter, Injectable, Output} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class AuthenticationService {

  @Output()
  loginEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    if (email === null || password === null) {
      return null;
    }

    let registerUrl = (environment.accountApiUrl + '/qry' + '/login');
    registerUrl = registerUrl + '?email=' + email + '&password=' + password;

    return this.http.get(registerUrl);
  }

  logout() {
    sessionStorage.clear();
  }

  register(username: string, email: string, password: string) {
    const apiModelRegister = {email, username, password};
    const postString = JSON.stringify(apiModelRegister);
    const config = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    const registerUrl = (environment.accountApiUrl + '/cmd' + '/register');
    this.http.post(registerUrl, postString, config).toPromise()
      .then()
      .catch();
  }

  findUsername(accountId: string) {
    const url = environment.accountApiUrl + '/qry/getUsername/' + accountId;
    return this.http.get(url);
  }
}
