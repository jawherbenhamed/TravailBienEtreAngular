import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  notif = false
  constructor(private userService:UserService,private userAuthService:UserAuthService,private router:Router) { }

  ngOnInit(): void {
  }
  public logOut() {
    this.userService.logOut(this.userAuthService.getUsername()).subscribe( (r:any )=> {
      console.log("am i logged in ",r)
  }  ,
  (error)=> {
    console.log("res",error)
  })
    this.userAuthService.clear()
    this.router.navigate(["/login"])
  }
  onClickChangePassword(loginForm:NgForm){
    
    if (loginForm.value.newPassword===loginForm.value.confirmPassword){

      this.userService.changePassword(loginForm.value.oldPassword,loginForm.value.newPassword).subscribe(
        (response: any)=> {
          if (response ===false)
          {
            this.notif=true
            setTimeout(() => {
              this.notif=false
            }, 3000);  
          }
          else {
          this.logOut()

          }
        },
  
        (error)=> {
          this.notif=true
          setTimeout(() => {
            this.notif=false
          }, 3000);         
        } ) 
  
      
    }
    else
    alert("veuillez confirmer votre password!")

  }

}
