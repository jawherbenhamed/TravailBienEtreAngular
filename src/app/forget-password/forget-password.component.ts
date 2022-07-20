import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  mailsent=false
  constructor(private userService:UserService,private router:Router) { }
  onClickForgetPassword(loginForm:NgForm){

    this.mailsent=true
    setTimeout(() => {
      this.mailsent=false
    }, 3000);  
    this.userService.forgetPassword(loginForm.value.userName).subscribe( (r:any )=> {

  }  ,
  (error)=> {


    this.router.navigate(["/login"])   })
  }
  ngOnInit(): void {

  }

}
