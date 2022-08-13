import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {aboutusEmail} from "../models/interfaces.file"

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  Contactusdata:aboutusEmail={} as aboutusEmail
  
  constructor(private http:HttpClient,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  
  SendEmailmessage(){
   this.http.post("http://localhost:29069/api/Email",this.Contactusdata,
   {responseType:"text"}).subscribe({next:data=>this.toastr.success(data),
    error:(err)=>{this.toastr.error("حدث خطأ برجاء المحاولة في وقت أخر")}})

  }
}
