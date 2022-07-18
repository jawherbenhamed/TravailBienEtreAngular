import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public usersList$: Observable<any>;
  constructor(private userService:UserService ) { }

  ngOnInit(): void {
    
    this.usersList$ = this.userService.usersList();

  }
  acceptUser (item:any):void {
    this.userService.approuvUser(item).subscribe(
      (response: any)=> {
        console.log("update ?")
        this.usersList$ = this.userService.usersList();
      },

      (error)=> {
        console.log("res",error)
      } ) 

  }
   onClickDelete(userName:string):void 
    {
      this.userService.deleteUser(userName).subscribe(
        (response: any)=> {
          console.log("delete ?")
          this.usersList$ = this.userService.usersList();
        },

        (error)=> {
          console.log("res",error)
        } ) 
    }


}
