import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  private data = new BehaviorSubject<any>('First Message');
  sharedData = this.data.asObservable();

  responseData: any = [];
  data2: any = [];
  LoginInfo: any = {};

  imageData : any;
  constructor(private apiService : ApiService) {
    this.LoginInfo = JSON.parse(localStorage.getItem('user') || '[]');
    this.fetchProfileData();
  
  }
  fetchProfileData(){
    if(this.LoginInfo.profiletype == 'Company'){
      this.getCompanyProfile();
    }else{
      this.getIndividulProfileData();
    }
  }
  setData(data : any){
    this.data.next(data);
  }

  getIndividulProfileData(){
    debugger
    this.apiService.getIndividualProfileDataById(this.LoginInfo.accid).subscribe((data: any) => {
      debugger
      console.log(JSON.stringify(data));
      this.data.next(data);
    })
  }

  getCompanyProfile(){
    debugger
    this.apiService.getCompanyProfileDataById(this.LoginInfo.accid).subscribe((data: any) => {
      debugger
      console.log(JSON.stringify(data));
      this.data.next(data);
    })
  }
 
}
