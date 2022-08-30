import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { SharedserviceService } from '../services/sharedservice.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }
deletemail:boolean=true;
  ngOnInit(): void {
    if(sessionStorage.getItem("Role")=='Admin')
    {
      this.deletemail=false;   
    }
  }
   logedemail:string=(sessionStorage.getItem("Email")||'{}');
  
  delete(){
    console.log(this.logedemail)
if(sessionStorage.getItem("Email")!=null)
{
  if(confirm('هل تريد حذف الحساب ؟؟'))
  {
  
  

  this.http.delete("http://localhost:29069/api/registration",
{params:new HttpParams().set("email",this.logedemail),responseType:"text"}).subscribe({next:data=>{
},error:(err)=>{throw new Error(err), this.logout();
}});

  }
}
}
    
  
  logout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("listcourse");
    sessionStorage.removeItem("Username")

    window.location.reload();
  }



}
