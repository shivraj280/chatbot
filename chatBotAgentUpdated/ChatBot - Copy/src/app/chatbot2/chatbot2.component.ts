import { Component, EventEmitter, OnInit, Input, ChangeDetectorRef, SimpleChanges, ApplicationRef, Output } from '@angular/core';
import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { APIServiceService, Message, Answer } from '../apiservice.service';
import { HttpClient } from '@angular/common/http';
import { JsonPipe, formatDate } from '@angular/common';
import { Subject } from 'rxjs';
//import { Chatbot3Component } from '../chatbot3/chatbot3.component';
import { MenubarComponent } from 'src/core/components/menubar/menubar.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { LoginserviceService } from 'src/core/services/loginservice.service';
import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Component({
  selector: 'app-chatbot2',
  templateUrl: './chatbot2.component.html',
  styleUrls: ['./chatbot2.component.css']
})
export class Chatbot2Component {
  @ViewChild(MenubarComponent, { static: false }) menubar: MenubarComponent | null = null;
  private socket: any;
  isTyping = false;
  isTypingForAgent = false;
  typingTimeout: any;
  // @Input() ChatBOTID: any;
  // @Output() userDataEmitter: EventEmitter<{ userId: string, activestatus: boolean }> = new EventEmitter();
  userIdForActiveStatus: any;
  showNotification: boolean = false;
  tabMinimizedSwitched: boolean = true
  message: string = '';
  ActiveStatus: any;
  messageText: string = '';
  senderId: any; // Replace with the actual sender ID
  receiverId: string = '';
  buttonData: any = [];
  ChatBotName: any = '';
  data: any = {};
  messages: any[] = [];
  Answers: any[] = []
  chatbotIdForShowMsg: any;
  users: any = [];
  getSenderIdArray: any = []
  jsonArray: any[] = []
  chatBot: any;
  chatBot1: any;
  chatBot2: any;
  question: any;
  question1: any;
  answers: any;
  ChatBotId: any = 1;
  agentId: any;
  themeColor: any;
  ProfileURL: any;
  ImageURL: any;
  VideoURL: any;//this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/dEJk-X0qeCw');
  userName = ''
  imageUrl = 'your-image-url.jpg';
  isHorizontal: boolean;
  chatbotidfromroute: any = '';
  useridToshowMessages: any;
  botUserId: any;
  receverIdForSendMessage: any
  messageBox: boolean = false;
  toggleValue: boolean = true;
  agentName: any;
  color: any;
  backcolor: any;
  isOnline: any;
  // Create a Map object
  //senderidReceiveridMap = new Map();
  senderidReceiveridMap = new Map<string, string>();
  tempUser: any;
  agentDetails: any = [];


  inputBoxWidth: any = '100%'
  usernameLeftMargin: any = '6%';
  usernameRightMargin: any = "2%";
  iconsMargin : any ='20%'
  toggleWidth() {
    // this.inputBoxWidth = this.inputBoxWidth === '81%' ? '100%' : '81%';
    this.usernameLeftMargin = this.usernameLeftMargin === '6%' ? '25%' : '6%';
    this.usernameRightMargin = this.usernameRightMargin === '6%' ? '25%' : '6%';
    this.iconsMargin = this.iconsMargin ==='20%' ? '2%' : '20%';
  }
  


  constructor(private LoginObj: LoginserviceService, private notificationService: NotificationService, private router: Router, private apiService: APIServiceService, private changeD: ChangeDetectorRef, private route: ActivatedRoute) {
  //  this.socket = io('http://54.187.212.229:5000');
   this.socket = io('http://localhost:5000');
    this.isHorizontal = this.checkIsHorizontal();
    this.agentDetails = JSON.parse(localStorage.getItem('user') || '[]');
  }

  checkIsHorizontal(): boolean {
    const img = new Image();
    img.src = this.ImageURL;
    return img.width > img.height;
  } 

  conversation = new Subject<Message[]>();
  label: any = "";
  async ngOnInit() {
    this.isOnline = navigator.onLine;
    try {
      this.senderId = ''
      this.receiverId = ''

      const getSenderId = localStorage.getItem('user');
      if (getSenderId) {
        this.getSenderIdArray = JSON.parse(getSenderId);
        // console.log("getSenderId", this.getSenderIdArray)

        // console.log("iddddd", this.getSenderIdArray[0].ChatbotID)
        for (let i = 0; i < this.getSenderIdArray.length; i++) {
          (async () => {
            //  debugger
            await new Promise(resolve => setTimeout(resolve, 0)); // Wait for 0 milliseconds asynchronously
            this.socket.emit('custom_connect', { senderId: this.getSenderIdArray[i].AgentSenderID.toString() });

          })();
        }

      }
    }
    catch (error) {
      // Handle the error
    }
    try {
      // debugger
      this.route.queryParams.subscribe(params => {
        this.messageBox = false
        // const chatbotidfromroute555 = params['chatBotIdForMessages']
        this.botUserId = params['userid'];
        this.chatbotidfromroute = params['id']
        console.log("ggggggg", this.botUserId[0])
        this.userName = this.botUserId[0]
        this.receverIdForSendMessage = this.botUserId[0]
        this.showUserMessages(this.botUserId[0], this.chatbotidfromroute[0])

      })

      // debugger
      this.route.queryParams.subscribe(params => {
        this.chatbotidfromroute = params['id'];
        console.log(this.chatbotidfromroute)
        this.senderId = this.chatbotidfromroute[0]
        const storedJson = localStorage.getItem('user');
        console.log("agentId", storedJson)

        for (let i = 0; i < this.agentDetails.length; i++) {
          if (this.agentDetails[i].ChatbotID == this.chatbotidfromroute) {
            this.apiService.setFavicon(this.agentDetails[i].profileURL)
          }
        }


        if (storedJson) {
          const parsedArray = JSON.parse(storedJson);
          this.agentId = parsedArray[0].pk_chtbtAgentID
          this.agentName = parsedArray[0].AgentName
          console.log("agentId", this.agentId)
        }
        this.changeChatBot();
        // debugger

      })
    }
    catch (error) {
      // Handle the error
    }
    try {
      this.apiService.GetChatBOTInfo(this.chatbotidfromroute).subscribe((res) => {
        // console.log(res)
        const data = JSON.parse(JSON.stringify(res))
        var currentTime = new Date("DD/MM/yyyy hh:mm tt");
        //  console.log(data.Table[0].themeColor); 
        this.themeColor = data.Table[0].themeColor
        this.ProfileURL = data.Table[0].profileurl
        this.ImageURL = data.Table[0].ImageURL
        this.VideoURL = data.Table[0].VideoURL

        // console.log(this.VideoURL); 

        if (data && data.Table && data.Table.length > 0) {
          this.chatBot = data.Table[0];
        }

        if (data && data.Table1 && data.Table1.length > 0) {
          this.question = data.Table1[0];
        }

        if (data && data.Table2 && data.Table2.length > 0) {
          this.answers = data.Table2;

          for (const ans of this.answers) {
          }
        }
      });
    }
    catch (error) {
      // Handle the error
    }
    try {
      this.socket.on('connect', () => {
        console.log('Connected to the server');
      });
      this.socket.on('disconnect', () => {
        // debugger
        console.log('Disconnected from the server');

        // You can attempt to reconnect here, e.g., with a delay.
        this.reconnectToServer();
      });

      this.socket.on('custom_connect', (data: any) => {
        console.log(`Connected as sender ID: ${data.senderId}`);
      });

      // Listen for private messages
      this.socket.on('private_message', (data: any) => {
        // Handle incoming private messages

        if (data.type == 'ReceivedAtSeverEnd') {
         //debugger
          let currentDate = new Date()
          console.log(`Received message from sender ID ${data.senderId}: ${data.currentDate}:${data.messageId} `);
          const conversationData = {
            AgentId: this.agentId,
            chatbotId: this.senderId,
            // senderId: receiverId,
            senderId: this.receverIdForSendMessage,
            // receiverId: this.senderId,
            userId: this.senderId,
            MessageType: "send_message",
            message: data.message,
            TimeStampstr: new Date().toString(),
            messageId: data.messageId,
            seenStatus: "singletik"
          }
          const data1 = {
            senderId: this.senderId,
            // receiverId :receiverId,
            receiverId: this.receverIdForSendMessage,
            type: "send_message",
            message: data.message,
            currentDate: this.convertFromToTimestamp(currentDate),
            messageId: data.messageId,
            seenStatus: "singletik"
          }
          this.messages.push(data1);
          this.conversationData(conversationData)
          setTimeout(() => {
            window.scroll(0, document.body.scrollHeight);
          }, 0);
        }
        if (data.type == 'Received_message') {
           debugger
          console.log(`Received message from sender ID and receiverid${data.senderId}: ${data.message} : ${data.receiverId}`);
          const currentDate = this.convertFromToTimestamp(data.currentDate);
          this.senderidReceiveridMap.set(data.senderId, data.receiverId);
          console.log("getsendrid ", this.senderidReceiveridMap.get(data.senderId));
          this.receiverId = data.senderId
          console.log("receiverid", this.receiverId)
          console.log(currentDate)
          data.currentDate = (currentDate);
          if (this.chatbotidfromroute[0] == data.chatBotId) {
          this.apiService.setNewMsgStatus(true);
          }
          else{
            this.apiService.setNewMsgStatus(false);
          }
          //seen Event
          this.socket.emit('doubleTik', { type: 'doubleTik', senderId: this.senderId, receiverId: this.receiverId.toString(), chatBotId: this.ChatBotId, message: data.message, messageId: data.messageId });

          // debugger
          try {
            if (this.userName != '' && this.botUserId[0] == data.senderId && this.chatbotidfromroute[0] == data.chatBotId) {
              this.apiService.setNewMsgStatus(false);
              const data2 = {
                receiverId: data.chatBotId,
                senderId: data.senderId,
                type: "Received_message",
                message: data.message,
                currentDate: currentDate,
              }
              this.messages.push(data2);
              setTimeout(() => {
                window.scroll(0, document.body.scrollHeight);
              }, 0);
              //debugger
              if (this.tabMinimizedSwitched == true) {
                this.socket.emit('bluetik', { type: 'bluetik', senderId: this.senderId, receiverId: this.receiverId.toString(), chatBotId: this.ChatBotId, });//message: data.message, messageId: data.messageId 
              }
            }
            else if (this.userName != '' && this.botUserId[0] != data.senderId && this.chatbotidfromroute[0] == data.chatBotId) {

            }    //***************************** */
          } catch (error) {
            // Handle the error
          }
          const conversationData = {
            AgentId: this.agentId,
            chatbotId: data.chatBotId,
            senderId: data.senderId,
            userId: data.chatBotId,
            MessageType: "Received_message",
            message: data.message,
            TimeStampstr: new Date().toString(),
            ActiveStatus: "online",
            messageId: data.messageId,

          }
          // debugger
          this.conversationData(conversationData)
          console.log("conversationData : ", conversationData)

          // const agentDetails = localStorage.getItem('user')
          console.log("this.agentDetails.length : ", this.agentDetails.length)
          for (let i = 0; i < this.agentDetails.length; i++) {
            if (this.agentDetails[i].ChatbotID == conversationData.userId) {
              console.log("Agent Name  : ", this.agentDetails[i].ChatbotName)
              this.showNotificationMessage('New message received from ' + this.agentDetails[i].ChatbotName, 10000); // 20000 ms = 20 seconds
              this.notificationService.playNotificationSound();
            }
          }
          // this.showNotificationMessage('This is a notification message ' + conversationData.userId, 10000); // 20000 ms = 20 seconds
          // this.notificationService.playNotificationSound();
          // debugger
          // this.menubar?.onClickFunction?.(conversationData.userId);
          //this.menubar.onClickFunction()
          /// this.menubar.onClickFunction(conversationData.userId)
          //this.storeDataInMessages("Received_message", data.senderId, data.receiverId, data.message)

        }
      });
      this.socket.on('doubleTik', (data: any) => {
       // debugger
        //this.messages
        data
        for (let i = 0; i < this.messages.length; i++) {
          if (data.messageId == this.messages[i].messageId) {
            console.log("doubletik")
            this.messages[i].seenStatus = "doubletik"
          }
        }
        this.messages
       const updateSeenStatusObj = {
        AgentId: this.agentId,
       // MessageType: data.chatBotId,
       // TimeStampstr: new Date().toString(),
        chatbotId: data.chatBotId,
       // message: "dfg",
        messageId: data.messageId,
        seenStatus: "doubletik",
        senderId: data.senderId
       // userId: "41"
        }
        this.updateSeenStatus(updateSeenStatusObj);
      });
      //blue Tik Event
      this.socket.on('bluetik', (data: any) => {
        //debugger
        //this.messages
        data
        for (let i = 0; i < this.messages.length; i++) {
          //  if (data.messageId == this.messages[i].messageId) {
          console.log("bluetik")
          this.messages[i].seenStatus = "bluetik"
          //  }
        }
        this.messages
        const updateSeenStatusObj = {
          AgentId: this.agentId,
         // MessageType: data.chatBotId,
         // TimeStampstr: new Date().toString(),
          chatbotId: data.chatBotId,
         // message: "dfg",
         // messageId: data.messageId,
          seenStatus: "bluetik",
          senderId: data.senderId
         // userId: "41"
          }
          this.updateSeenStatus(updateSeenStatusObj);
      });
      // messageType: string ,senderId: string,receiverId: string, message: string
      this.socket.on('user_status', (statusUpdate: any) => {
        if (statusUpdate.type === 'online') {
          this.apiService.setNewMsgStatus(true);
         //  debugger
          console.log(`User ${statusUpdate.userId} is online`);
        } else if (statusUpdate.type === 'offline') {
          this.apiService.setNewMsgStatus(true);
          // debugger
          console.log(`User ${statusUpdate.userId} is offline`);
          // const ActiveStatusoff = {
          //   ActiveStatus: statusUpdate.type,
          //   SenderId: statusUpdate.userId,
          //   TimeStampstr: new Date().toString()
          //   // mode: 99
          // }
          // this.conversationData(ActiveStatusoff);
        }
      });

    }
    catch (error) {
      // Handle the error
    }
    this.onToggleChange();
    window.addEventListener('online', () => {
      // debugger
      this.isOnline = true;
      alert("You are now Online")
      this.reconnectToServer();
    });

    window.addEventListener('offline', () => {
      //  debugger
      this.isOnline = false;
      alert("You are now Offline")
    });
    window.addEventListener('beforeunload', this.onWindowClose.bind(this));

    // senderId: this.senderId
    // // receiverId :receiverId,
    // receiverId: this.receverIdForSendMessage,
    document.addEventListener('keyup', () => {

      if (!this.isTypingForAgent) {
        // debugger
        this.socket.emit('typing', { type: "AgentToUser", senderId: this.senderId, receiverId: this.receverIdForSendMessage });
      }
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
        // debugger

        this.socket.emit('stopTyping', { type: "AgentToUser", senderId: this.senderId, receiverId: this.receverIdForSendMessage });
      }, 1000); // Adjust the timeout as needed
    });

    //User Typeing Event
    this.socket.on('userTyping', (data: any) => {

      console.log(`Connected as sender ID: ${data.senderId, data.receiverId}`);
      if (this.userName != '' && this.botUserId[0] == data.senderId && this.chatbotidfromroute[0] == data.ChatBotId) {
        this.isTyping = true;
      }
    });

    //User Stop Typeing Event
    this.socket.on('userStoppedTyping', (data: any) => {
      // debugger
      console.log(`Connected as sender ID: ${data.senderId, data.receiverId}`);
      if (this.userName != '' && this.botUserId[0] == data.senderId && this.chatbotidfromroute[0] == data.ChatBotId) {
        this.isTyping = false;
      }
    });
  }


  ngAfterViewInit(): void {

    this.changeChatBot()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.changeChatBot()

  }
  changeChatBot() {
    try {
      this.apiService.GetChatBOTInfo(this.chatbotidfromroute).subscribe((res) => {
        //   console.log(res)
        const data = JSON.parse(JSON.stringify(res))
        var currentTime = new Date("DD/MM/yyyy hh:mm tt");
        //   console.log(data.Table[0].themeColor); 
        this.themeColor = data.Table[0].themeColor
        this.ProfileURL = data.Table[0].profileurl
        this.ImageURL = data.Table[0].ImageURL
        this.VideoURL = data.Table[0].VideoURL
        this.messages = [];
        //   console.log(this.VideoURL); 

        if (data && data.Table && data.Table.length > 0) {
          this.chatBot = data.Table[0];
        }

        if (data && data.Table1 && data.Table1.length > 0) {
          this.question = data.Table1[0];
        }

        if (data && data.Table2 && data.Table2.length > 0) {
          this.answers = data.Table2;

          for (const ans of this.answers) {
          }
        }



        this.changeD.detectChanges();


      });
      this.changeD.detectChanges();
    }
    catch (error) {
      // Handle the error
    }
  }

  convertFromToTimestamp(time_stamp: any) {

    var dateStr = String(time_stamp);

    var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;

    var formatDateStr = dateStr.replace(pattern, '$1/$2/$3 $4:$5:$6');

    var formatDate1 = new Date(new Date(formatDateStr).getTime());

    var dd = formatDate(formatDate1, 'MMM dd, HH:mm:ss', 'en')

    return dd;

  }
  onButtonClick(event: any) {
    try {
      var currentTime = this.convertFromToTimestamp(new Date());
      // console.log(new Date())
      // console.log(currentTime)
      window.scroll(0, document.body.scrollHeight);
      // alert("onButtonClick called"+event.target.value)

      var buttonText: any;
      buttonText = (event.target as HTMLButtonElement).textContent;
      const userMessage = new Message("bot", buttonText, this.Answers, currentTime);
      // console.log('Button Text:', buttonText);


      //this.messages.push(userMessage)
      // console.log(this.messages)

      const QuestionId = event.target.value


      //this.Answers=[];
      this.apiService.GetNextQuestionInfo(this.ChatBotId, QuestionId).subscribe((res) => {

        //  console.log(res)
        const data = JSON.parse(JSON.stringify(res))

        if (data && data.Table && data.Table.length > 0) {

          this.chatBot1 = data.Table[0];
          //   console.log(this.chatBot1)
          //console.log(this.chatBot1.question);



          // console.log(userMessage)
          //console.log(this.conversation)  

        }

        if (data && data.Table1 && data.Table1.length > 0) {
          this.question1 = data.Table1[0];

          // console.log(this.question1)
          // console.log(this.question1.Answer)

        }
        //const userMessage1 = new Answer(this.question1.Answer, this.question1.fk_nextquestionid);
        const userMessage1 = data.Table1;
        //  console.log(userMessage1)
        this.Answers = [];
        currentTime = this.convertFromToTimestamp(new Date());
        //this.Answers = data.Table1[0];
        this.Answers.push(userMessage1)
        const userMessage = new Message("user", this.chatBot1.question, this.Answers, currentTime);

        this.conversation.next([userMessage]);
        //const userMessage = new Message("user", this.chatBot1.question);

        // this.messages.push(userMessage)
        this.conversation.next([userMessage]);

        //this.conversation.next([userMessage1]);    
        // console.log(this.Answers)
        // console.log(this.messages) 
        // console.log(userMessage.content)
      })
    }
    catch (error) {
      // Handle the error
    }
  }
  signout() {
    try {


      if (localStorage.getItem('user') != null) {



        this.tempUser = localStorage.getItem('user');

        localStorage.removeItem("user");

        localStorage.setItem('user', this.tempUser);

        this.router.navigate(['/login'])

          .then(() => {

            window.location.reload();

          });





      } else {



        this.LoginObj.logout();

      }

      localStorage.removeItem('user');

      this.router.navigate(['login']);
    }
    catch (error) {
      // Handle the error
    }

  }
  sendMessage() {
    alert("Message Sent")
  }
  //For socket messages 
  sendPrivateMessage(receiverId: string, message: string) {
   // debugger
    try {
      //receiverId = this.senderId;
      console.log("ssssss", this.senderId)
      const receiverIds = this.senderidReceiveridMap.get(this.senderId);
      //  console.log("messageand receiverid",message,receiverId)
      let currentDate = new Date()
      if (this.messageText != '') {
        //   console.log()
        this.socket.emit('private_message', {
          // AgentId: this.agentId,
          // chatbotId: this.senderId,
          senderId: this.senderId,
          // receiverId :receiverId,
          receiverId: this.receverIdForSendMessage,
          message: message,
          type: 'private_message',
          toGetAgentsocket: this.getSenderIdArray[0].AgentSenderID.toString()
        });
        // const data = {
        //   senderId: this.senderId,
        //   // receiverId :receiverId,
        //   receiverId: this.receverIdForSendMessage,
        //   type: "send_message",
        //   message: message,
        //   currentDate: this.convertFromToTimestamp(currentDate),
        //   tikEvent:"singletik"
        // }
        // this.messages.push(data);
        // debugger
        // const conversationData = {
        //   AgentId: this.agentId,
        //   chatbotId: this.senderId,
        //   // senderId: receiverId,
        //   senderId: this.receverIdForSendMessage,
        //   // receiverId: this.senderId,
        //   userId: this.senderId,
        //   MessageType: "send_message",
        //   message: message,
        //   TimeStampstr: currentDate.toString()
        // }
        // this.conversationData(conversationData)
        // debugger

        setTimeout(() => {
          window.scroll(0, document.body.scrollHeight);
        }, 0);
      }
      this.messageText = ''
    }
    catch (error) {
      // Handle the error
    }
  }

  // Handle sending messages from the UI
  sendMessageToReceiver(receiverId: string, message: string) {
    try {
      if (message.trim() !== '') {
        this.sendPrivateMessage(receiverId, message);
      }
    }
    catch (error) {
      // Handle the error
    }
  }
  getKeyByValue(searchValue: any): string | null {
    try {
      for (const [key, value] of this.senderidReceiveridMap.entries()) {
        if (value === searchValue) {
          return key;
        }
      }
    }
    catch (error) {
      // Handle the error
    }
    return null; // Return null if the value is not found

  }
  storeDataInMessages(messageType: string, senderId: string, receiverId: string, message: string) {
    // Add more user objects as needed
    //const users = [];
    // Store the JSON array in localStorage
    try {
      const newUser = {
        messageType: messageType,
        message: message,
        senderId: senderId,
        receiverId: receiverId,
        currentDate: this.convertFromToTimestamp(new Date())
      }
      this.users.push(newUser);
      localStorage.setItem('userMessages', JSON.stringify(this.users));
      //let storedMessages = JSON.parse(localStorage.getItem('userMessages')) || [];
    }
    catch (error) {
      // Handle the error
    }
  }
  async connectSocketAsync(): Promise<void> {
    try {
      return new Promise((resolve) => {
        // Assuming this.socket is your socket object
        this.socket.on('custom_connect', (data: any) => {
          console.log(`Connected as sender ID: ${data.getSenderIdArray[0].ChatbotID}`);
          resolve();
        });
      });
    }
    catch (error) {
      // Handle the error
    }
  }
  conversationData(Messagrobj: any) {
    //debugger
    try {
      this.apiService.PostConversation(Messagrobj).subscribe((data: any) => {
        if (data.Success) {
         // alert("New message has arrived from chatbot Id: ")
          // this.showAlert("New message has arrived from chatbot Id: "+Messagrobj.chatbotId)
        }
        else {
          alert(data.Message)
        }
      });
    }
    catch (error) {
      // Handle the error
    }
  }
  updateSeenStatus(dataObj: any) {
    //debugger
    try {
      this.apiService.PostSeenStatus(dataObj).subscribe((data: any) => {
        if (data.Success) {
         // alert("New message has arrived from chatbot Id: ")
          // this.showAlert("New message has arrived from chatbot Id: "+Messagrobj.chatbotId)
        }
        else {
          alert(data.Message)
        }
      });
    }
    catch (error) {
      // Handle the error
    }
  }
  showUserMessages(userId: any, chatbotId: any) {
    try {
      console.log("show user call")
      // debugger
      this.isTyping = false;
      this.apiService.showMessages(chatbotId, userId).subscribe((res) => {
        // console.log(res)
        const data = JSON.parse(JSON.stringify(res))
        // debugger
        console.log("usersname", data.Data)
        for (let i = 0; i < data.Data.length; i++) {
          //  debugger
          this.messages.push(data.Data[i]);
        }
        this.messageBox = true
        setTimeout(() => {
          window.scroll(0, document.body.scrollHeight);
        }, 0);
        //debugger
        this.socket.emit('bluetik', { type: 'bluetik', senderId: this.senderId, receiverId: this.receiverId.toString(), chatBotId: this.ChatBotId, });//message: data.message, messageId: data.messageId 
      })
    }
    catch (error) {
      // Handle the error
    }
  }
  showNotificationMessage(message: string, duration: number) {
    try {
      this.message = message;
      this.showNotification = true;

      setTimeout(() => {
        this.hideNotification();
      }, duration);
    }
    catch (error) {
      // Handle the error
    }
  }

  hideNotification() {
    this.showNotification = false;
  }


  onWindowClose() {

    this.toggleValue = false

    this.onToggleChange()

    // Handle the window close event

    // You can perform additional actions here if needed

  }


  onToggleChange() {

    // This function is triggered when the toggle button state changes

    console.log('Toggle value is now:', this.toggleValue);

    try {

      const AvailableStatusData = {
        AgentSenderId: 0,
        AgentId: this.agentId,
        IsAgentAvailable: this.toggleValue

      }

      this.apiService.PostAvailableStatus(AvailableStatusData).subscribe((data: any) => {

        if (data.Success) {

          //alert   ("New message has arrived from chatbot Id: " + Messagrobj.chatbotId)

          // this.showAlert("New message has arrived from chatbot Id: "+Messagrobj.chatbotId)

        }

        else {

          //alert(data.Message)

        }

      });

    }

    catch (error) {

      // Handle the error

    }

  }
  private reconnectToServer() {
    setTimeout(() => {
      this.socket.connect();
      for (let i = 0; i < this.getSenderIdArray.length; i++) {
        (async () => {
          //  debugger
          await new Promise(resolve => setTimeout(resolve, 0)); // Wait for 0 milliseconds asynchronously
          this.socket.emit('custom_connect', { senderId: this.getSenderIdArray[i].AgentSenderID.toString() });

        })();
      }
    }, 100); // You can adjust the delay as needed.
  }
  // sendMessageToMenu(userid: any, user_status: any) {
  //   this.router.navigate(['/chatbot'], {
  //     queryParams: { userid: [userid], status: [user_status] }
  //   });
  // }
  // In your chat component



  showScrollButton = false;
  showScrollBottomButton = false


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;
    this.showScrollButton = scrollPosition > 100; // Show the button after scrolling 100 pixels
    // Check if the user is at the bottom of the page
    //this.showScrollBottomButton = (window.innerHeight + window.scrollY) >= document.body.offsetHeight ;
    this.showScrollBottomButton = scrollPosition < 100
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    this.showScrollBottomButton = false
  }
  @HostListener('window:blur', ['$event'])
  onTabBlur(event: Event): void {
    this.tabMinimizedSwitched = false;
    // This function is called when the browser tab is blurred (e.g., minimizedSwitched to a different tab)
    console.log('Tab blurred');
  }
  @HostListener('window:focus', ['$event'])
  onTabFocus(event: Event): void {
    //debugger
    this.tabMinimizedSwitched = true;
    // This function is called when the browser tab is focused (e.g., brought back into view)
    if (this.userName != '' && this.botUserId[0] == this.receiverId.toString()) {

    this.socket.emit('bluetik', { type: 'bluetik', senderId: this.senderId, receiverId: this.receiverId.toString(), chatBotId: this.ChatBotId,  });//message: data.message, messageId: data.messageId
    }
    console.log('Tab focused');
  }
}


