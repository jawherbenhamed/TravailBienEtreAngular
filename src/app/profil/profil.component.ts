import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  public imagepath = '../../assets/downloadFile/'
  public user:any=null
  public firstName:string;
  public lastName:string
  public phone:string
  public email:string
  public photo:string
  public userName:string
  public profession:string
  public file:any;
  editing = false;
  notif = false;
  imgup=false;
 
 
   constructor(private userService: UserService,private router:Router) { }
   
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
         this.photo=this.imagepath+ this.user.photo
         this.profession=this.user.profession
       }, 
       (error)=>{
         console.log(error);
       }
     );
  }
  changePass(){
    this.router.navigate(["/changePassword"])
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
        this.file=file;
        this.imgup=true;
    }
  } 
    // on form submit function
    onImageUpload() {
      const formData = new FormData();
      formData.append('file', this.file);

  
      this.userService.uploadPhoto( formData)
        .subscribe(res => {
          localStorage.setItem("photo",this.photo)
          console.log('Uploaded Successfully.');
        })
    }
  onEdit(){
    this.editing = true;
  }

  onSave(){
    this.userService.uodateUser({
      "userName":this.userName,
      "userFirstName":this.firstName,
      "userLastName":this.lastName,
      "phone":this.phone,
      "email":this.email,
      "photo":this.photo,
      "profession":this.profession,
      "disabled":this.user.disabled}).subscribe(
      (response) => {
        if (this.imgup){
          this.onImageUpload();
        }
        this.editing = false;
        this.notif=true
        console.log(response)
        setTimeout(() => {
          this.notif=false
        }, 5000);      
      }, 
      (error)=>{
        console.log(error);
      });
  }


}
