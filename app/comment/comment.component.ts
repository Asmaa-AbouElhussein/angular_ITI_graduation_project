import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {commentData, UserComment} from "../models/interfaces.file"
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
   usersComments:commentData[]=[]
   commentData:UserComment={} as UserComment
  invalidComment:boolean=false
  ModalTitle = 'اضافة تعليق';
  ActivateAddEditcrsComp: boolean = false;
   islogged:boolean=false
  // course:ICoursesDetails ={
  //   id:0,
  //   name:"",
  //   imgpath:"",
  //   price:0,
  //   discount:0,
  //   description:"",
  //   numberofvideos:0,
  //   numberofhours:0,
  //   date:"",
  //   code:""
  // };
  constructor(private http:HttpClient,private toastr:ToastrService) { }
  
  

  ngOnInit(): void {
    this.http.get<commentData[]>("http://localhost:29069/api/comments").subscribe({next:data=>
    {this.usersComments=data,
      
      console.log(this.usersComments);
      
    },error:(err)=>{throw new Error(err)}})
    
  }
  onSwiper([swiper]: any): void {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
  addClick() {
    this.ModalTitle = "اضافة تعليق";
    this.ActivateAddEditcrsComp = true;
  }
  closeClick() {
    this.ActivateAddEditcrsComp = false;
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
  
  submitComment(element:HTMLTextAreaElement){
    
    if(element.value !=""){
      let email=sessionStorage.getItem("Email")
      if(email!=null){
        
        
      this.commentData={Email:email,comment:element.value}
      
      
   this.http.post("http://localhost:29069/api/comments",this.commentData,{responseType:"text"})
   .subscribe({next:data=>{this.toastr.success(data),this.ngOnInit(),element.value=""},error:error=>{throw new Error(error)}
   }
   )
      }  else{ 
          ///////////////
      }
  }else{
        this.invalidComment=true
       setTimeout(() => {
        this.invalidComment=false
       }, 1500); 
    }
  }

}
