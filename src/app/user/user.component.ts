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



  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        this.user = response;
        console.log("user info",this.user);

      }, 
      (error)=>{
        console.log(error);
      }
    );
}


}
