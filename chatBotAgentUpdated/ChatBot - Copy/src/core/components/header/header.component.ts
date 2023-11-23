import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginserviceService} from  'src/app/core/services/loginservice.service';
 import { ProfileDataService } from '../../services/profile-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private LoginObj: LoginserviceService, private profileDataService : ProfileDataService) 
  {
    console.log("header call");
    //profileDataService.fetchProfileData();
   }

 // loginInfo : any ={};
  LoginName:any={};
  LoginInfo:any={};
  SupportNo:any={};
  SupportEmail:any={};
  tempUser : any;
  imgURL: any = '';
  imageData : any = '';

  data2: any = [];

  ngOnInit(): void {
  
  
 // this.imgURL = this.profileDataService.getData();  

  this.profileDataService.sharedData.subscribe(data =>{
    debugger
    if (data.Success) {
      this.data2 = data.Data;
      if(this.data2[1].profileimage != ''){
        this.imgURL = "data:image/png;base64,"+this.data2[1].profileimage;
      }else{
        this.imgURL = this.data2[1].profileimage;
      }
    }
  })

  console.log("image showw");  

//  this.profileDataService.setData(this.imageData);
 
  this.LoginInfo=JSON.parse(localStorage.getItem('user')|| '[]');
   this.LoginName=this.LoginInfo.loginname;

   if(this.LoginInfo.supportemail!=null && this.LoginInfo.supportmobile!=null)
   {
   this.SupportNo=this.LoginInfo.supportmobile;
    this.SupportEmail=this.LoginInfo.supportemail;
  }

   
  }
  signout(){

    if(localStorage.getItem('user_temp') != null){

      this.tempUser = localStorage.getItem('user_temp');
      localStorage.removeItem("user_temp");
      localStorage.setItem('user',this.tempUser);
      this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });


    }else{
      
      this.LoginObj.logout();
    }
     localStorage.removeItem('user');
     this.router.navigate(['login']);
  }
Show()
{
if(this.LoginInfo.supportemail!=null && this.LoginInfo.supportmobile!=null)
return this.LoginInfo.supportemail;
}

}
