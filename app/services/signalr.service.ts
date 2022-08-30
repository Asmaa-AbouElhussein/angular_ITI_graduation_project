import { Injectable } from '@angular/core';
import {sendermess} from "../models/interfaces.file"
import * as signalR from '@aspnet/signalr'
import { Observable, Subject } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
hubconnection:signalR.HubConnection={} as signalR.HubConnection 
private senddata=new Subject<sendermess>()
senddata$=this.senddata.asObservable()
private sendonlineusername=new Subject<string>()
sendonlineusername$=this.sendonlineusername.asObservable()
private removeonlineusername=new Subject<string>()
removeonlineusername$=this.removeonlineusername.asObservable()
constructor() { }

  startconnection(){
    this.hubconnection=new signalR.HubConnectionBuilder().
    withUrl(`http://localhost:29069/toastr?username=${sessionStorage.getItem("Username") as string}`,{skipNegotiation:true,transport:signalR.HttpTransportType.WebSockets}).build()
    this.hubconnection.start().then(()=>console.log("welcome from angular")).
    catch((err)=>console.error("error while starting connection"+err)
    )
  } 

  askserver(data:sendermess){
    this.hubconnection.invoke("sendMess",data)
    .catch(()=>{console.error("error happened with askserver");
    })
  }

  serverListener(){
     this.hubconnection.on("serversend",(data)=>{this.senddata.next(data)
    })
    
  }
  
  serverListenerOnonlineusers(){
    this.hubconnection.on("onlineUsers",(data)=>this.sendonlineusername.next(data))
  }
  serverListenerOnremoveonlineusers(){
    this.hubconnection.on("RemoveonlineUsers",(data)=>this.removeonlineusername.next(data))
  }

}
