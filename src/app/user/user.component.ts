import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user:any=null
 public firstName:string;
 public lastName:string
 public phone:string
 public email:string
 public photo:string



  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        this.user = response;
        console.log("user info",this.user);
        this.firstName=this.user.userFirstName
        this.lastName=this.user.userLastName
        this.email=this.user.email
        this.phone=this.user.phone
        this.photo=this.user.photo
      }, 
      (error)=>{
        console.log(error);
      }
    );
}

onChangeFirstName(firstName:string){
  this.firstName=firstName
}
onChangeLastName(lastName:string){
  this.lastName=lastName
}
onChangePhone(phone:string){
  this.phone=phone
}
onChangeEmail(email:string){
  this.email=email
}
onChangePhoto(photo:string){
  this.photo=photo
}
onclick(){
    this.userService.uodateUser({
    "userName":this.user.userName,
    "userFirstName":this.firstName,
    "userLastName":this.lastName,
    "phone":this.phone,
    "email":this.email,
    "photo":this.photo,
    "disabled":this.user.disabled}).subscribe(
    (response) => {
      console.log(response)
      alert("user info updated succefully!")
    }, 
    (error)=>{
      console.log(error);
    });
  console.log("changed ? ",this.lastName,this.firstName)
}
}
