import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuthService:UserAuthService, private router:Router , public userService:UserService ){ }

  ngOnInit(): void {
  }
public isLoggedIn() {
  return this.userAuthService.isLoggedIn()
}
public logOut() {
  this.userService.logOut(this.userAuthService.getUsername()).subscribe( (r:any )=> {
    console.log("am i logged in ",r)
}  ,
(error)=> {
  console.log("res",error)
})
  this.userAuthService.clear()
  this.router.navigate(["/home"])
}
}
