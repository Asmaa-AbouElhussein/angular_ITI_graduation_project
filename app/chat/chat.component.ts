import { HttpParams,HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { sendermess,messRec } from '../models/interfaces.file';
import { SharedserviceService } from '../services/sharedservice.service';

import { SignalrService } from '../services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ChatComponent implements OnInit,AfterViewInit {
  admin:boolean=false;
  text:string="";
  onlineusers=new Set()
  listnames:any[]=[];
  
  message:sendermess={} as sendermess 
  messageRec:messRec[]=[]  
  @ViewChild("chatbox",{static:true})chatbox!:ElementRef

  constructor(private signalr:SignalrService,private http:HttpClient,private sharedservice:SharedserviceService) {
   
   }
  ngAfterViewInit(): void {
  
    this.signalr.senddata$.subscribe(data=>
      {console.log(data);
      
        this.chatbox.nativeElement.innerHTML+=`
      
        <div class="chat incoming">
        <div class="details">
            <p>${data.message}</p>
        </div>
            </div>
            `}  )

            this.signalr.removeonlineusername$.subscribe(data=>{this.onlineusers.delete(data)
            console.log(this.onlineusers);
            
            });
            
          }
      

                  

  ngOnInit(): void {
    
    this.signalr.startconnection()
   var userName=sessionStorage.getItem("Username") as string
   if(userName!='Admin22'){
   this.message.Receiver='Admin22'
   this.getdata(userName,'chat incoming','chat outgoing','text-align:left;','text-align:right;')
   }
   this.signalr.serverListener()
   if(userName=="Admin22"){
    this.signalr.serverListenerOnonlineusers()
    this.signalr.sendonlineusername$.subscribe(data=>{this.onlineusers.add(data)
      console.log(this.onlineusers);
    })
    this.signalr.serverListenerOnremoveonlineusers()
      
   }
    // this.signalr.askserver(this.message)
    // this.signalr.serverListener()
    if(sessionStorage.getItem("Role")=='Admin')
    {
              this.admin=true;
      }

    this.sharedservice.Getallregisternames().subscribe(data=>this.listnames=data)

  }
  submitform(){


    this.chatbox.nativeElement.innerHTML+=`
    
    <div class="chat outgoing">
        <div class="details">
            <p>${this.message.message}</p>
        </div>
            </div>`

    this.message.Sender=sessionStorage.getItem("Username") as string
    
    this.signalr.askserver(this.message)
    
    
    
  }


  search()
  {
    this.sharedservice.Getallregisternames().subscribe(data=>this.listnames=data.filter((a: { username: string | string[]; })=>a.username.includes(this.text)))
  }

  event(userName:string){
    this.chatbox.nativeElement.innerHTML=""
    this.message.Receiver=userName
    this.getdata(userName,'chat outgoing','chat incoming','text-align:right;','text-align:left;')
   
  }

   getdata(userName:string,from:string,to:string,datefrom:string,dateto:string){
   
    this.http.get<messRec[]>("http://localhost:29069/api/Chat",{params:new HttpParams().set("name",userName)})
    .subscribe({next:data=>{console.log(data),
      this.messageRec=data,
        
      this.messageRec.map(er=>this.chatbox.nativeElement.innerHTML+=`
      
      <div class="${er.sender==userName ? to : from }">
          <div class="details">
              <p>${er.message}</p>
          </div> 
              </div>
              <p class='lead' style="${er.sender==userName ? dateto : datefrom }">${er.date}</p>
              `
    
    )},error:err=>{throw new Error(err)}
    })
   }
}
