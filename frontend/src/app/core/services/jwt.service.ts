import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): String {
    return window.localStorage['Token'];
  }

  saveToken(token: String) {
    window.localStorage['Token'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('Token');
  }

}
