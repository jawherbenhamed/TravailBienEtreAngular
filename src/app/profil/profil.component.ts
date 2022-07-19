import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public user:any=null
  public firstName:string;
  public lastName:string
  public phone:string
  public email:string
  public photo:string
 public userName:string
 
 
   constructor(private userService: UserService) { }
   
   ngOnInit(): void {
     this.userService.getUserInfo().subscribe(
       (response) => {
         this.user = response;
         console.log("user info",this.user);
         this.userName=this.user.userName
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
}
