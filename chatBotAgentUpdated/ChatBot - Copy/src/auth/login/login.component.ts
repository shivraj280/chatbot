import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, MinLengthValidator } from '@angular/forms';
import { Router, NavigationEnd } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { analyzeAndValidateNgModules } from '@angular/compiler';
//import { ApiService } from 'src/app/api.service';
//import { LoginserviceService } from 'src/app/core/services/loginservice.service';

import { APIServiceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient,
    private apiService: APIServiceService, private LoginServeObj: APIServiceService) {
    localStorage.removeItem("user");
    this.router.events.subscribe((e) => {

      if (e instanceof NavigationEnd) {
        if (localStorage.getItem('user') != null) {
          this.router.navigate(['chatbot'])
            .then(() => {
              window.location.reload();
            });
        }
      }
    });
  }

  ngOnInit(): void {
  }
  fieldTextType: boolean = false;
  loading = false;
  Isloggedin: boolean = false;
  

  loginForm = new FormGroup({
    email:   new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    
  });
  doNavigate: any;
  responseData: any = [{}];
  data2: any = [{}];
  data1: any = [{}];
  doLogin: boolean = false;
  routeName: string = "/";
  errorShow: boolean = false;
  errorMsg: string = "";


  login2() {
     debugger;
    this.loading = true;
    this.errorShow = false;

    if (this.loginForm.invalid) { return; }
    console.log(this.loginForm.value)
    const verifyObj = {
      "username": this.f.email.value,
      "password": this.f.password.value
    }
    console.log(verifyObj);

    this.apiService.login(verifyObj).subscribe((data: any) => {
      // console.log(JSON.stringify(data));
        debugger;
        console.log(data)
      
        // debugger;
      if (data.Success) {
       
         this.data2 = data.Data;
         this.responseData = this.data2;
         // console.log(this.responseData);
         localStorage.setItem('user', JSON.stringify(this.responseData));

        // if (!this.responseData.planstatus && this.responseData.role != "Admin") {
        //   // this.routeName = "select_userplan";
        //   this.routeName = "/dashboard";
        // }
        // else {
        //   this.routeName = "/";
        // }
       // this.router.navigate(['/chatbot'])
          // .then(() => {
          //  window.location.reload();
          // });
          console.log(this.responseData[0]['ChatbotID']);
          this.router.navigate(['/chatbot'],{queryParams:{id : [this.responseData[0]['ChatbotID']]}
       });
      }
      else {
        //  console.log(" success not true");
        this.loading = false;
        this.router.navigate(['login']);
        this.errorShow = true;
        this.errorMsg = "Invalid Username or Password";

      }


    }, (error:any) => {
      this.loading = false;
      this.errorShow = true;
      this.errorMsg = error;
      // this.$validationForm.smartWizard("loader", "hide");
      //throw error;
    })
  }


  redireSignUp() {
    this.router.navigate(['registration']);
  }

  reset() {
    this.loginForm.reset();
  }

  get f() { return this.loginForm.controls; }
  

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  forgotPassword() {

    // this.apiService.getOtp().subscribe((data: any) => {
    //   console.log(JSON.stringify(data));
    //   this.router.navigateByUrl('/otp_validate', { state: { otp: data.Data.OTP, status: 'forgot' } });
    // },
    //   (err: HttpErrorResponse) => {
    //     console.log("Error==" + err.message);
    //   });
  }

  resetPassword() {
    this.http.post('http://44.229.98.173:1112/api/OTP/Forgot?Mobile=8806790767', null).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        this.router.navigateByUrl('/otp_validate', { state: { otp: data.Data.OTP, status: 'reset' } });

      },
      (err: HttpErrorResponse) => {
        console.log("Error==" + err.message);
      }
    );
  }


  //property defined
  //property defined
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


}
