import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesapiService } from 'src/app/services/coursesapi.service';
import { ApiService } from '../services/api.service';
import { SharedserviceService } from '../services/sharedservice.service';
import { videodata } from 'src/app/models/interfaces.file';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICoursesDetails, ICourses_category } from '../models/classes';
import {Location} from '@angular/common';
@Component({
  selector: 'app-courses-detailes',
  templateUrl: './courses-detailes.component.html',
  styleUrls: ['./courses-detailes.component.scss']
})
export class CoursesDetailesComponent implements OnInit {

 
constructor(private rout:ActivatedRoute,private _location: Location ,private service:CoursesapiService , private router:Router,private apiservice:ApiService,private sharedservice:SharedserviceService,private http:HttpClient) { }
c:boolean=false;
//code activation
islogged:boolean=false;
codeerror:boolean=false;
id:any;
code:string="";
purchastlist:any[]=[];
listid:any[]=[];
/////////////////////
course:ICoursesDetails={
  id:0,
  name:"",
  imgpath:"",
  price:0,
  discount:0,
  description:"",
  numberofvideos:0,
  numberofhours:0,
  date:"",
};
videoList:videodata[]=[];
categories:ICourses_category[]=[];
cat:any;
selectedList:videodata[]=[]
videos:videodata[]=[]; 
v:videodata={
  id:0,
  name:"",
  description:"",
  videopath:"",
  courses_Categoryid:0
};
tests:any[]=[];
path:string|undefined;
video:videodata[]=[];
  ngOnInit(): void {
this.getallactivatecourses();
this.rout.paramMap.subscribe({next:(pramas:ParamMap)=>{this.id=pramas.get("id");}
,error:(err)=>{throw new Error(err)}})
this.service.getCourseByid(this.id).subscribe({next:data =>{this.course=data},
  error:(err)=>{throw new Error(err)}})
this.getfirstvideo();
let coursecode =JSON.parse(localStorage.getItem("listcourse")||'{}');
if(coursecode!=null){
  for(var i=0;i<coursecode.length;i++)
  {
          
    if(coursecode[i]==this.id)
    {
      this.c=true;
      this.apiservice.GetCatBYFK(this.id).subscribe({next:cats => {this.categories }
      ,error:(err)=>{throw new Error(err)}})
      break;
    }
  }
}
if(sessionStorage.getItem("Role")=='Admin')
{
      this.c=true;
      this.apiservice.GetCatBYFK(this.id).subscribe({next:cats => {this.categories }
      ,error:(err)=>{throw new Error(err)}})
}

///code activation

  }

  
    checkLogin(){
      if (localStorage.getItem("jwt")!=null) {
        var headers=new HttpHeaders().set
          ("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
        this.http.get("http://localhost:29069/api/registration/Auth",{headers,responseType:"text"}).
        subscribe({next:data=>{sessionStorage.setItem("Email",JSON.parse(data)[0])
        this.islogged=true},error:(err)=>{throw new Error(err)}}
        )
      }

  }
Activatecourse(){
 
  let logedemail=sessionStorage.getItem("Email")
    this.getallactivatecourses();
  for(var i=0;i<this.purchastlist.length;i++)
  {
 if(this.purchastlist[i].email===logedemail&&this.purchastlist[i].code===this.code&&this.purchastlist[i].courseid==this.id)
    {
      ////////////code of show course videos and category here
      this.c=true;
      this.apiservice.GetCatBYFK(this.id).subscribe({next:cats => {this.categories }
      ,error:(err)=>{throw new Error(err)}})
    ////code locale storage
      if(JSON.parse(localStorage.getItem("listcourse")||'{}')!=null)
      {
        let newlist=JSON.parse(localStorage.getItem("listcourse")||'{}');
        for(var i=0;i<newlist.length;i++)
        {
          this.listid.push(newlist[i]);
        }
        this.listid.push(this.id);
        localStorage.setItem("listcourse",JSON.stringify(this.listid));
      }
      else
      {
        this.listid.push(this.id);
        localStorage.setItem("listcourse",JSON.stringify(this.listid));
      }
     window.location.reload();
        break;
    }
    else{
      this.codeerror=false;
    }
  }
  
}
/////////////////////////

  getvideodetailes (id:any){
    this.router.navigate([`coursedetailes/${this.id}/${id}`])
  }
  getfirstvideo()
  {
    this.apiservice.GetCatBYFK(this.id).subscribe({next:cats => {this.categories =cats
      this.cat=this.categories[0]
      this.sharedservice.GetVideoBYFK(this.cat.id).subscribe(data =>{this.video=data
     
      })
    },error:(err)=>{throw new Error(err)}})
    


  }
  getallactivatecourses(){
    this.apiservice.getallpurchased().subscribe({next:purch=>{this.purchastlist=purch}
    ,error:(err)=>{throw new Error(err)}});

  }

  backClicked() {
    this._location.back();
  }
  
}
