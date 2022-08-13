import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesapiService } from 'src/app/services/coursesapi.service';
import { ApiService } from '../services/api.service';
import { SharedserviceService } from '../services/sharedservice.service';
import { videodata } from 'src/app/models/interfaces.file';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICoursesDetails, ICourses_category } from '../models/classes';
@Component({
  selector: 'app-courses-detailes',
  templateUrl: './courses-detailes.component.html',
  styleUrls: ['./courses-detailes.component.scss']
})
export class CoursesDetailesComponent implements OnInit {

 
constructor(private rout:ActivatedRoute ,private service:CoursesapiService , private router:Router,private apiservice:ApiService,private sharedservice:SharedserviceService,private http:HttpClient) { }
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
  code:""
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
this.rout.paramMap.subscribe((pramas:ParamMap)=>{this.id=pramas.get("id");})
this.service.getCourseByid(this.id).subscribe(data =>{this.course=data})
this.getfirstvideo();
let coursecode =JSON.parse(localStorage.getItem("listcourse")||'{}');
if(coursecode!=null){
  for(var i=0;i<coursecode.length;i++)
  {
          
    if(coursecode[i]==this.id)
    {
      this.c=true;
      this.apiservice.GetCatBYFK(this.id).subscribe(cats => {this.categories })
      break;
    }
  }
}

///code activation

  }

  
    checkLogin(){
      if (localStorage.getItem("jwt")!=null) {
        var headers=new HttpHeaders().set
          ("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
        this.http.get("http://localhost:29069/api/registration/Auth",{headers,responseType:"text"}).
        subscribe(data=>{sessionStorage.setItem("Email",data)
        this.islogged=true}
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
      this.apiservice.GetCatBYFK(this.id).subscribe(cats => {this.categories })
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
    this.apiservice.GetCatBYFK(this.id).subscribe(cats => {this.categories =cats
      this.cat=this.categories[0]
      this.sharedservice.GetVideoBYFK(this.cat.id).subscribe(data =>{this.video=data
      console.log(this.video)
      })
    })
    


  }
  getallactivatecourses(){
    this.apiservice.getallpurchased().subscribe(purch=>{this.purchastlist=purch});

  }
  
}
