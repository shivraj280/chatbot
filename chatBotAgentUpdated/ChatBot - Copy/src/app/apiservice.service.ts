

import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



export class Message {
  constructor(public author: string, public content: string, public AnswerArray: any, public Timestamp: any) { }
}

export class Answer {
  constructor(public ans: string, public nextqid: string) { }
}

// export class YourComponent {
//   videoUrl: SafeResourceUrl;

//   constructor(private sanitizer: DomSanitizer) {
//     // Replace 'your_video_url_here' with the actual video URL
//     this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=dEJk-X0qeCw');
//   }
// }
@Injectable({
  providedIn: 'root'
})

export class APIServiceService {
  isNewMsg: boolean=false;
  constructor(private http: HttpClient) { }
  private selectedChatbotID: number = 0;

  setSelectedChatbotID(id: number) {
    this.selectedChatbotID = id;
  }

  getSelectedChatbotID(): number {
    return this.selectedChatbotID;
  }
  
  setNewMsgStatus(status:any) {

    this.isNewMsg = status;

    console.log("set this.isNewMsg : ",this.isNewMsg)

  }

 

  getNewMsgStatus() {

    console.log("get this.isNewMsg : ",this.isNewMsg)

    return this.isNewMsg;

  }

  setFavicon(iconPath: string) {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    link.href = iconPath;
  }

  obj: any;
  conversation = new Subject<Message[]>();
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
      "preflightContinue": "false"
    })
  }
  // https://localhost:44367/api/ChatBOT/GetChatBOTInfo?ChatBotId=1

  GetChatBOTInfo(id: any) //get all category from server
  {
    return this.http.get('http://api.sms123.in/api/ChatBOT/GetChatBOTInfoFromSharedURL?ChatBotId=' + id, this.httpOptions)
      //return this.http.get('https://localhost:44367/api/ChatBOT/GetChatBOTInfo?ChatBotId='+id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  GetNextQuestionInfo(ChatBotId: any, QuestionId: any) //get all category from server
  {
    return this.http.get('http://api.sms123.in/api/ChatBOT/GetNextQuestionInfo?ChatBotId=' + ChatBotId + '&QuestionId=' + QuestionId, this.httpOptions)
      //return this.http.get('https://localhost:44367/api/ChatBOT/GetNextQuestionInfo?ChatBotId='+ChatBotId+'&QuestionId='+QuestionId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  GetUsersAndCnt(ChatBotId: any,AgentId:any) //get all category from server
  {
    return this.http.get('http://api.sms123.in/api/ChatBOT/GetMessageCnt?ChatbotId=' + ChatBotId+"&AgentId="+AgentId, this.httpOptions)
      //return this.http.get('https://localhost:44367/api/ChatBOT/GetNextQuestionInfo?ChatBotId='+ChatBotId+'&QuestionId='+QuestionId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  showMessages(ChatBotId: any,senderId:any) //get all category from server
  {
    return this.http.get('http://api.sms123.in/api/ChatBOT/GetMessage?ChatbotId=' + ChatBotId+"&senderId="+senderId, this.httpOptions)
      //return this.http.get('https://localhost:44367/api/ChatBOT/GetNextQuestionInfo?ChatBotId='+ChatBotId+'&QuestionId='+QuestionId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  login(data: any): Observable<any> {
    //debugger;
    //return this.http.post<any>('http://54.202.5.93:8082/api/user/login', JSON.stringify(data), this.httpOptions)
    // return this.http.post<any>('https://localhost:44367/api/ChatBOT/Login', JSON.stringify(data), this.httpOptions)  
    return this.http.post<any>('http://api.sms123.in/api/ChatBOT/Login', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  PostConversation(data: any): Observable<any> {
    //debugger;
    //return this.http.post<any>('http://54.202.5.93:8082/api/user/login', JSON.stringify(data), this.httpOptions)
    // return this.http.post<any>('https://localhost:44367/api/ChatBOT/Login', JSON.stringify(data), this.httpOptions)  
    return this.http.post<any>('http://api.sms123.in/api/ChatBOT/PostConversation', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  UpdateSenderId(data: any): Observable<any> {
   // debugger;
    //return this.http.post<any>('http://54.202.5.93:8082/api/user/login', JSON.stringify(data), this.httpOptions)
    // return this.http.post<any>('https://localhost:44367/api/ChatBOT/Login', JSON.stringify(data), this.httpOptions)  
    return this.http.post<any>('http://api.sms123.in/api/ChatBOT/UpdateSenderId', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  PostAvailableStatus(data: any): Observable<any> {

  //  debugger;

    //return this.http.post<any>('http://54.202.5.93:8082/api/user/login', JSON.stringify(data), this.httpOptions)

    // return this.http.post<any>('https://localhost:44367/api/ChatBOT/Login', JSON.stringify(data), this.httpOptions)  

    return this.http.post<any>('http://api.sms123.in/api/ChatBOT/UpdateAgentAvailability', JSON.stringify(data), this.httpOptions)

      .pipe(

        retry(1),

        catchError(this.handleError)

      )

  }
  PostSeenStatus(data: any): Observable<any> {
    //debugger;
    //return this.http.post<any>('http://54.202.5.93:8082/api/user/login', JSON.stringify(data), this.httpOptions)
    // return this.http.post<any>('https://localhost:44367/api/ChatBOT/Login', JSON.stringify(data), this.httpOptions)  
    return this.http.post<any>('http://api.sms123.in/api/ChatBOT/UpdateSeenStatus', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getReceivedMsgCount(agentId:any){

    console.log("agentID : ",agentId)                

return this.http.get(' http://api.sms123.in/api/ChatBOT/BindChatbots?AgentId=' + agentId, this.httpOptions)

.pipe(

retry(1),

catchError(this.handleError)

)

}

  // Error handling 
  handleError(error: any) {
    //debugger;
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //  window.alert(errorMessage);
    return throwError(errorMessage);
  }


}

