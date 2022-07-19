import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  mailsent=false
  constructor(private userService:UserService) { }
  onClickForgetPassword(loginForm:NgForm){

    //to do
    this.userService.forgetPassword(loginForm.value.userName).subscribe( (r:any )=> {
      alert("un email a été envoyé")
  }  ,
  (error)=> {
    alert(error)  })
  }
  ngOnInit(): void {

  }

}
