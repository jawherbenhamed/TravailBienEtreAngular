import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService:UserService,
              private router:Router
    ) { }

  ngOnInit(): void {
       //check if connected + role
       const roles =JSON.parse(localStorage.getItem('roles'))
        
       if(roles != null){
         if (roles[0]?.roleName==='User')
         this.router.navigate(['/home'])
         else if (roles[0]?.roleName==='Admin')
         this.router.navigate(['/admin'])
       }
  }
  public r:string ="";
  public signUp(loginForm:NgForm){
    this.userService.signUp(loginForm.value).subscribe(
      (response: any)=> {
        console.log(response)
        this.router.navigate(['login'])
    },
      (error)=> {
        this.r=error;
        console.log("res",error)
      }
    )
  }

}
