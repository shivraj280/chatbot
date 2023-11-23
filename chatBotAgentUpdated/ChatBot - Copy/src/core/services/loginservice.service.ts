import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import * as LoginJsonData from 'src/assets/logindata.json';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  //myuser = LoginJsonData;
  username1: string = "";// "user@test.com";
  password1: string = "";// "123456";
  name: any = '';
  isAddMode: boolean = false;
  varReturn: boolean = false;
  Logindata: any = [];
  Logindata1: any = [];
  SessionArray = [{}];
  LoginProfile: any = [];
  result:boolean=false;
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {


  }

  isLogin() {
    debugger;
    if (localStorage.getItem("username")) {

      return true;
    } else {

      return false;
    }

  }

  Checklogin(usernamep: string, password: string) {

   

    //this.LoginProfile = (this.myuser as any).default;
    this.Logindata1 = this.LoginProfile.find(
      (x: { username: string; password: string; }) => x.username === usernamep && x.password === password);
    if (this.Logindata1 != null) 
    {
      const user=this.Logindata1;
      localStorage.setItem('user', JSON.stringify(user));
      this.result = true;
    }
    
    
    return this.result;

  }


  logout()
  {

    localStorage.removeItem("user");
    this.router.navigate(['login']);
  }
  // Checklogin(usernamep: string, password: string) {

  //   this.username1 = usernamep;
  //   this.password1 = password;

  //   this.httpClient.get("assets/logindata.json").subscribe(data => {
  //     // console.log(data);
  //     this.Logindata = data;
  //     this.Logindata.forEach((element: any) => {
  //       if (element.username == this.username1) {
  //         debugger;

  //         this.LoginProfile = element;
  //         console.log(this.LoginProfile);

  //       }
  //     });

  //     if (this.LoginProfile != "") {
  //       console.log("in method");
  //       debugger;
  //       if (this.LoginProfile.username == this.username1 && this.LoginProfile.password == this.password1) {
  //         debugger;

  //         console.log("in in");
  //         this.SessionArray.splice(0);
  //         this.SessionArray.push({ name: "IsLoggedIn", value1: "true" });
  //         this.SessionArray.push({ name: "AccID", value1: this.LoginProfile.AccID });//account id
  //         this.SessionArray.push({ name: "username", value1: this.username1 });//username
  //         this.SessionArray.push({ name: "AccType", value1: this.LoginProfile.AccType });
  //         this.SessionArray.push({ name: "Loginname", value1: this.LoginProfile.LoginName });
  //         // this.SessionArray.push({name: ,value1 :});

  //         //return this.SessionArray;

  //         this.varReturn = true;
  //         //return true;
  //       }

  //       else {
  //         this.SessionArray.push({ name: "IsloggedIn", value1: "false" });
  //         // return    this.varReturn=true;;
  //       }

  //     }
  //     else {
  //       this.SessionArray.push({ name: "IsloggedIn", value1: "false" });
  //       //return    this.varReturn=true;;

  //     }

    
  //   })

  //   if (this.varReturn) {
  //     debugger;
  //     return this.SessionArray;
  //   }
  //   else {
  //     return this.varReturn;

  //   }

  // }
}
