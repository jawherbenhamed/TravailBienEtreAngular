import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public usersList:Array<any>;
  constructor(private userService:UserService ) { }

  ngOnInit(): void {
    this.userService.usersList().subscribe(
      (response: any)=> {
        this.usersList=response;
        console.log("any record ?",this.usersList)

      },

      (error)=> {
        console.log("res",error)
      }
    )

  }
   onClickDelete(userName:string):void 
  {
    this.userService.deleteUser(userName).subscribe(
      (response: any)=> {
        console.log("delete ?")

      },

      (error)=> {
        console.log("res",error)
      } ) }
  // getUserList(){
    
  //   this.userService.usersList().subscribe(
  //     (response: any)=> {
  //       this.usersList=response;
  //       console.log("any record ?",response)

  //     },

  //     (error)=> {
  //       console.log("res",error)
  //     }
  //   )
  //     }
}
