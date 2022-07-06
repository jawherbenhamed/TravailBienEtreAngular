import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService ,
     private userAuthService:UserAuthService,
     private router:Router
     ) { }

  ngOnInit(): void {
  }
  login(loginForm:NgForm){
    console.log("user form",loginForm.value);
    this.userService.login(loginForm.value).subscribe(
      (response: any)=> {
        console.log(response)
      this.userAuthService.setToken(response.jwtToken)
      this.userAuthService.setRole(response.user.role)
      const role =response.user.role[0].roleName;
        role === "Admin" ? this.router.navigate(['/admin']):this.router.navigate(['/user']) 
    },
      (error)=> {
        console.log("res",error)
      }
    )
      }
    



  
}