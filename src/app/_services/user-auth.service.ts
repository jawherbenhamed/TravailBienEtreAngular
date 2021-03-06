import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  public setRole(roles:[]) {
    localStorage.setItem("roles",JSON.stringify(roles))
  }
  public getRoles (): [] {
    return JSON.parse(localStorage.getItem("roles"))
  }
  public setToken (jwtToken: string) {
    localStorage.setItem("token", jwtToken)

  }
  public getToken() :string {
    return localStorage.getItem("token")
  }
  public setUserName(username:string)  {
     localStorage.setItem("username",username);
  }
  public getUsername() :string {
    return localStorage.getItem("username")
  }

  public clear () {
    localStorage.clear()
  }
  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

  
}
