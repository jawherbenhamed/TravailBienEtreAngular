import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:8080/travail"

  requestHeader = new HttpHeaders({"No-Auth":"True"})

  
  constructor(private httpclient: HttpClient ,private userAuthService : UserAuthService) { }

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate',loginData,{headers : this.requestHeader})
  }
  public signUp(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/registerNewUser',loginData,{headers : this.requestHeader})
  }
  public loggedIn(username:string) {
    return this.httpclient.get(this.PATH_OF_API + '/login/'+username,{headers : this.requestHeader})
  }
  public logOut(username:string) {
    return this.httpclient.get(this.PATH_OF_API + '/logout/'+username,{headers : this.requestHeader})
  }
  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }
  public uodateUser(User:any){
    return this.httpclient.put(this.PATH_OF_API + '/users',User)

  }
  public usersList(){
    return this.httpclient.get(this.PATH_OF_API + '/users')

  }
  public getUserInfo(){
    return this.httpclient.get(this.PATH_OF_API + '/userInfo')

  }
  public deleteUser(userName:string){
    return this.httpclient.delete(this.PATH_OF_API + '/users/'+userName)
  }
  public getMyMessages(channel:string){
    return this.httpclient.get(this.PATH_OF_API + '/messages/'+channel)
  }
  public approuvUser(user:any){
    return this.httpclient.get(this.PATH_OF_API + '/user/approuve/'+user);
  }
  public roleMatch(allowedRoles):boolean{
    let isMatch = false;
    let userRoles:any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles){
      for (let i=0; i<userRoles.length;i++){
        for (let j=0 ; j< allowedRoles.length; j++){
              if(userRoles[i].roleName === allowedRoles[j]){
                isMatch = true;
                return isMatch;
              }
              else{
                return isMatch
              }

        }
      }
    } 
  }
}
