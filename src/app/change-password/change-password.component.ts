import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  onClickChangePassword(loginForm:NgForm){
    
    if (loginForm.value.newPassword===loginForm.value.confirmPassword){

      this.userService.changePassword(loginForm.value.oldPassword,loginForm.value.newPassword).subscribe(
        (response: any)=> {
          console.log("changed ?",response)
        },
  
        (error)=> {
          console.log("res",error)
        } ) 
  
      
    }
    else
    alert("veuillez confirmer votre password!")

  }

}
