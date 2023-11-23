import { HttpClient, HttpHandler } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { APIServiceService } from 'src/app/apiservice.service';
import { Chatbot2Component } from 'src/app/chatbot2/chatbot2.component';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenubarComponent implements OnInit {

  @Input() ActiveStatus: any
  @Input() userid: any
  isDropdownOpen: boolean = false;
  iseditDropdownOpen: boolean = false;
  color: any;
  backcolor: any;
  clickedItem: any = null;
  countVisible: any = true;
  newMsgReceived: any;
  isTyping: boolean = true;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

    if (this.isDropdownOpen) {

      // debugger;

      console.log("In toggle Dropdown open")



      this.APIServiceService.getReceivedMsgCount(this.AgentId).subscribe((res: any) => {

        console.log("Msg count : ",);

        this.Chatbots = res.Data;

        console.log(this.Chatbots)



      });
    }
  }
  toggleEditDropdown(event: any, id: any) {
    // debugger;
    console.log("dropdowntoggle", id.isDropdownOpen);
    // this.items[1].isDropdownOpen=!this.items[1].isDropdownOpen
    // const itemToToggle = this.items.find(i => i === id);


    for (let i = 0; i < this.items.length; i++) {

      if (this.items[i].UserName === id.UserName) {
        this.items[i].isDropdownOpen = !this.items[i].isDropdownOpen
        //index = i; // Update the index if a match is found
        //break; // Exit the loop once a match is found
      }
      else if (this.items[i].isDropdownOpen) {
        this.items[i].isDropdownOpen = !this.items[i].isDropdownOpen
      }
    }

  }
  closeDropdown() {

    this.isDropdownOpen = false;
  }
  closeEditDropdown(event: any, id: any) {
    //this.iseditDropdownOpen = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].isDropdownOpen === true) {
        this.items[i].isDropdownOpen = !this.items[i].isDropdownOpen
        //index = i; // Update the index if a match is found
        break; // Exit the loop once a match is found
      }
    }

  }
  Editedname: any;
  profileURL: any;
  myChatBotId: any = null
  AgentId: any
  ChatbotID: any = null;
  loginInfo: any = {};
  LoginName: any = {};
  LoginName1: any = {};
  profileType: any;
  Chatbots: any = {};
  items: any = [];

  item1: any = [{ "UserName": "Akshada", "msgcnt": 7, "ActiveStatus": "online" },

  { "UserName": "Sahil", "msgcnt": 2, "ActiveStatus": "online" },

  { "UserName": "Shivraj", "msgcnt": 3, "ActiveStatus": "offline" },

  { "UserName": "Mrunmayee", "msgcnt": 10, "ActiveStatus": "online" }

  ];

  item2: any = [{ "UserName": "Sachin", "msgcnt": 1 },

  { "UserName": "Nitin", "msgcnt": 2 },

  { "UserName": "Khilchand", "msgcnt": 5 },

  { "UserName": "Kunal", "msgcnt": 9 }

  ];
  constructor(private router: Router, private APIServiceService: APIServiceService, private changeDetectorRef: ChangeDetectorRef) {

    this.loginInfo = JSON.parse(localStorage.getItem('user') || '[]');
    console.log(this.loginInfo);
    this.profileType = this.loginInfo.profiletype;
    // this.LoginName=this.LoginName1.Loginname;
    // this.Chatbots = this.loginInfo;
    //this.ChatbotID=this.loginInfo[0].ChatbotID;
    this.profileURL = this.loginInfo[0].profileURL;

    console.log(this.profileURL);
    console.log(this.Chatbots);
    this.myChatBotId = this.loginInfo[0].ChatbotID
    this.AgentId = this.loginInfo[0].pk_chtbtAgentID

    this.onClickFunction(this.loginInfo[0])

  }

  selectedChatbotID: number = 0;
  DashboardStyle: string = "";
  ProfileStyle: string = "";
  DeviceManagementStyle: string = "";
  SettingsStyle: string = "";
  PlanManagementStyle: string = "";
  AccountStyle: string = "";
  EmployeeStyle: string = "";
  SupportStyle: string = "";
  SimMgmntStyle: string = "";
  AMCMgmntStyle: string = "";
  UserAMCMgmntStyle: string = "";
  DeviceInventoryMgmntStyle: string = "";
  ReportStyle: string = "";
  SupportedDeviceStyle: string = "";
  MaintenanceStyle: string = "";
  DriverDataStyle: string = "";
  InstallationDetailsStyle: string = "";
  TransferDeviceStyle: string = "";
  chatBotIdForMessages: any;
  ngOnInit(): void {
    try {
      //check whether ISloggedIn is true or not

      console.log("this.ChatbotID: ", this.ChatbotID)

      if (this.ChatbotID == null && this.selectedChatbotID == 0) {

        this.router.navigate(['/chatbot'], {
          queryParams: { id: [this.loginInfo[0].ChatbotID] }

        });

        // this.chatBotIdForMessages = ChatbotID
        console.log("Activestatus", this.ActiveStatus, this.userid)
      }

      // if(this.ChatbotID==null)
      // {
      //    this.router.navigate(['/chatbot'],{queryParams:{id : [this.loginInfo[0].ChatbotID]}
      //     });
      // }
      // this.myChatBotId=this.loginInfo[0].ChatbotID
      // console.log("this.ChatbotID: ", this.loginInfo[0].ChatbotID)
      console.log(this.myChatBotId)
      //   this.showDropdown(this.myChatBotId) 
    }
    catch (error) {
      // Handle the error
    }
  }
  ngAfterViewInit(): void {
    try {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      //check whether ISloggedIn is true or not
      //this.showDropdown(3);
      if (localStorage.getItem('user') != null) {
        //show hide required menus 
      }
      else {
        //redirect to login for authorized user
        this.router.navigate(['login'])
      }
    }
    catch (error) {
      // Handle the error
    }
  }
  get isAdmin() {

    if (this.loginInfo && this.loginInfo.role === 'Admin')
      return this.loginInfo.role;
  }

  get isUser() {
    if (this.loginInfo && this.loginInfo.role === 'User')
      return this.loginInfo.role;

  }

  get isSupport() {
    if (this.loginInfo && this.loginInfo.role === 'Support')
      return this.loginInfo.role;
  }
  get isMreseller() {

    if (this.loginInfo && this.loginInfo.role === 'Master Reseller')
      return this.loginInfo.role;
  }
  get isReseller() {
    if (this.loginInfo && this.loginInfo.role === 'Reseller')
      return this.loginInfo.role;
  }
  get isAdminUser() {//60c2f4224843bf0bd431eda9
    if (this.loginInfo && this.loginInfo.role === 'User')// && this.loginInfo.mrid == 0
      return this.loginInfo.role;
  }




  onChatbotSelect(event: any) {
    try {
      // debugger;
      this.selectedChatbotID = event.target.value; // Get the selected value (ChatbotID)

      //if (this.selectedChatbotID){
      this.router.navigate(['/chatbot'], {
        queryParams: { id: [this.selectedChatbotID] }
      });
      //}

      console.log('Selected ChatbotID:', this.selectedChatbotID);
    }
    catch (error) {
      // Handle the error
    }
    //this.selectedChatbotID = event.target.value;
    //this.APIServiceService.setSelectedChatbotID(this.selectedChatbotID);

    //const Chatbot2=new Chatbot2Component(this.APIServiceService,this.changeDetectorRef);
    //Chatbot2.changeChatBot();
    //Chatbot2.ngOnInit();
    //this.router.navigate(['/Chatbot'])

    // You can perform further actions with the selected value here

    // Navigate to Chatbot2Component and pass selectedChatbotID as a route parameter


  }
  onClickFunction(chatbot: any) {
    try {
      // debugger

      this.chatBotIdForMessages = chatbot.ChatbotID
      this.APIServiceService.GetUsersAndCnt(chatbot.ChatbotID, this.AgentId).subscribe((res) => {
        // console.log(res)
        const data = JSON.parse(JSON.stringify(res))
        console.log("usersname", data)
        // var currentTime = new Date("DD/MM/yyyy hh:mm tt");
        //  this.items = data.Data  //orignal code
        debugger
        //this.items = data.Data.add.this.isTyping == true);
        // for(let i=0;i < data.Data.length;i++){
        //   data.Data[i].isTyping = true
        // }  
        //orignal code
        this.items = data.Data
        //  debugger
        // this.items=this.item1
        this.profileURL = chatbot.profileURL

        this.changeFavicon(this.profileURL)

        this.changeDetectorRef.detectChanges();

        console.log('Clicked on chatbot:', chatbot);

        this.closeDropdown();
        this.showMessages2(data.Data[0])
      })
      // Your logic here

      // debugger;

      // if(chatbot.ChatbotID==1){this.items=this.item1}else

      // { this.items=this.item2}



      //window.location.href = `/chatbot?id=${chatbot.ChatbotID}`;

      this.router.navigate(['/chatbot'], {
        queryParams: { id: [chatbot.ChatbotID] }

      });
    }
    catch (error) {
      // Handle the error
    }
    setInterval(() => {

      //console.log("Interval Called again!")  

      this.newMsgReceived = this.APIServiceService.getNewMsgStatus();

      // console.log("newMsgReceived : ",this.newMsgReceived)

      if (this.newMsgReceived === true) {



        this.APIServiceService.GetUsersAndCnt(chatbot.ChatbotID, this.AgentId).subscribe((res) => {

          // console.log(res)

          const data = JSON.parse(JSON.stringify(res))

          console.log("usersname", data)
          debugger
          for (let i = 0; i < data.Data.length; i++) {
            data.Data[i].isTyping = true
          }  
          this.items = data.Data
          // this.items = data.Data //.add(this.isTyping == true);  //orignal code
          // this.items.data
        })

        this.APIServiceService.setNewMsgStatus(false)
      }

    }, 2000);

    // this.items.data //.this.isTyping == true;
    // 

  }

  changeFavicon(icon: string) {
    // Determine the appropriate icon path based on the selected option
    const iconPath = icon; // Adjust the path as needed
    this.APIServiceService.setFavicon(iconPath);
  }


  showMessages2(evt: any) {
    try {
      console.log("evt : ", evt)
      const userid = (evt.target as HTMLElement).textContent;
      //const userid = item.UserName
      console.log('Span clicked! Text: ' + userid + "hhh " + this.ChatbotID);
      this.router.navigate(['/chatbot'], {
        queryParams: { userid: [userid], id: [this.chatBotIdForMessages] }
      });
    }
    catch (error) {
      // Handle the error
    }
  }

  isClickedItem(item: any): boolean {

    return this.clickedItem === item;

  }
  showMessages(evt: any, item: any) {
    try {
      console.log("evt : ", evt)

      this.isDropdownOpen = false;
      this.countVisible = false
      this.clickedItem = item;
      this.clickedItem.msgcnt = 0

      this.color = 'white',

        this.backcolor = "rgb(75 79 85)"
      // const userid = (evt.target as HTMLElement).textContent;
      const userid = item.UserName
      console.log('Span clicked! Text: ' + userid + "hhh " + this.ChatbotID);
      this.countVisible = false
      this.router.navigate(['/chatbot'], {
        queryParams: { userid: [userid], id: [this.chatBotIdForMessages] }
      });
    }
    catch (error) {
      // Handle the error
    }
  }

  onRightClick(event: MouseEvent, item: any) {
    try {
      // debugger;
      event.preventDefault(); // Prevent the default context menu from appearing
      console.log('Right-clicked on item:', item);
      this.toggleEditDropdown(event, item);
    }
    catch (error) {
      // Handle the error
    }
  }

  showDropdown(chatbot: any) {
    try {
      let senderIdReceivedMessage = [];
      let uniqueSenderIds = new Set();
      let dummyArray = [];

      // Your logic here
      // debugger;
      const storedJson = sessionStorage.getItem('userMessages');
      //console.log("storedJson",storedJson)
      if (storedJson) {
        const parsedArray = JSON.parse(storedJson);
        console.log("parsedArray", parsedArray)
        //receivedMessagesf:Message[] = parsedArray.filter(Message => Message.messageType === 'Received_message');
        for (const obj of parsedArray) {
          if (obj.messageType === 'Received_message') {

            const data = {
              UserName: obj.senderId,
              receverid: obj.receiverId
              // message: message,
              // currentDate: this.convertFromToTimestamp(new Date())
            }
            if (chatbot.ChatbotID == obj.receiverId) {
              senderIdReceivedMessage.push(data);
              //break; // Exit the loop once the first match is found
            }
          }
        }
        console.log("senderIdReceivedMessage", senderIdReceivedMessage)
        // Extract unique sender IDs from receivedMessages
        // uniqueSenderIds = Array.from(new Set(this.receivedMessages.map(message => message.senderId)));
        senderIdReceivedMessage.forEach(item => {
          uniqueSenderIds.add(item.UserName);
        });
        dummyArray = Array.from(uniqueSenderIds);
        console.log("uniqueSenderIds", dummyArray)
        senderIdReceivedMessage = [];
        for (const obj of dummyArray) {
          const data = {
            UserName: obj
            // message: message,
            // currentDate: this.convertFromToTimestamp(new Date())
          }
          // senderIdReceivedMessage=[];
          senderIdReceivedMessage.push(data)
        }
      }

      // for (let i = 0; i < senderIdReceivedMessage.length; i++) {
      //   console.log("ChatbotID", chatbot.ChatbotID, senderIdReceivedMessage[i].receverid)
      //   console.log(chatbot.ChatbotID == senderIdReceivedMessage[i].receverid)
      // if(chatbot.ChatbotID == 1){
      //   this.items = this.item1 
      // }
      //if (chatbot.ChatbotID == senderIdReceivedMessage[i].receverid) {
      console.log("Matched")
      this.items = senderIdReceivedMessage
      console.log("iteam", this.items)
      // }
      // else {
      //   // senderIdReceivedMessage = null
      //   this.items = [];
      //   //senderIdReceivedMessage.splice(0, senderIdReceivedMessage.length);
      //   console.log("NotMatched")
      // }
      this.profileURL = chatbot.profileURL

      this.changeDetectorRef.detectChanges();

      console.log('Clicked on chatbot:', chatbot);

      this.closeDropdown();
    }
    catch (error) {
      // Handle the error
    }
  }

  EditUsername(id: any) {
    try {
      // debugger;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].UserName === id.UserName) {
          //this.items[i].isDropdownOpen=!this.items[i].isDropdownOpen

          var object = {
            ChatBotId: 0,
            SenderId: this.items[i].UserName,
            NewSenderId: this.Editedname
          }
          console.log("Object for Edit Username : ", object)
          this.APIServiceService.UpdateSenderId(object).subscribe((res) => {
            // console.log(res)
            const data = JSON.parse(JSON.stringify(res))

          })
          this.items[i].EditedUserName = this.Editedname;
          this.items[i].isDropdownOpen = !this.items[i].isDropdownOpen;
          this.Editedname = '';
          //index = i; // Update the index if a match is found
          break; // Exit the loop once a match is found
        }
      }
    }
    catch (error) {
      // Handle the error
    }
  }
}
