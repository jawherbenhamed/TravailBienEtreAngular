import { JsonPipe } from '@angular/common';
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
   notiferror=false
   notisuccess=false

  constructor(private userService:UserService ,
     private userAuthService:UserAuthService,
     private router:Router
     ) { }

  ngOnInit(): void {
        //check if connected + role
        const roles =JSON.parse(localStorage.getItem('roles'))
        if (roles[0]?.roleName==='User')
        this.router.navigate(['/home'])
        else if (roles[0]?.roleName==='Admin')
        this.router.navigate(['/admin'])
  }

  login(loginForm:NgForm){
    console.log("user form",loginForm.value);
    this.userService.login(loginForm.value).subscribe(
      (response: any)=> {
        console.log(response)

          if(!response.user.disabled)
          {

            this.userAuthService.setToken(response.jwtToken)
            this.userAuthService.setRole(response.user.role)
            this.userAuthService.setUserName(response.user.userName)
            localStorage.setItem('user',JSON.stringify(response.user))
            this.userService.loggedIn(response.user.userName).subscribe( (r:any )=> {
              console.log("am i logged in ",r)
          }  ,
          (error)=> {
            console.log("res",error)
        
          })
            const role =response.user.role[0].roleName;
              role === "Admin" ? this.router.navigate(['/admin']):this.router.navigate(['/user']) 
          }
          else {
            this.notisuccess=true
            setTimeout(() => {
              this.notisuccess=false
            }, 5000);  
          }
    }
  ,
      (error)=> {
        console.log("res",error)
        this.notiferror=true
        console.log("notif error",this.notiferror)

        setTimeout(() => {
          this.notiferror=false
        }, 3000);   

      }
    )

      }
    

      redirectToForgetPasword(){
        this.router.navigate(['/forgetPassword'])
      }

  
}
