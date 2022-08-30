import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Output,EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { min } from 'rxjs';
import Validation from '../models/classes';
import {Userdata} from "../models/interfaces.file"
import { ApiService } from '../services/api.service';
import { SharedserviceService } from '../services/sharedservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  
  form!:FormGroup
  submitted = false;
  isSet = false;
check:boolean=true;
code:string="";
correctcode:string="";
codeerror:boolean=false;
  Udata:Userdata={} as Userdata
  @Output() Isadmin:EventEmitter<boolean>=new EventEmitter()
  @Output() sendUname:EventEmitter<boolean>=new EventEmitter()

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private service:SharedserviceService,private sendmail:ApiService,private toastr:ToastrService) {}
  resgiterlist:any[]=[];

  ngOnInit(): void {
    this.service.Getallregister().subscribe({next:data=>{this.resgiterlist=data},error:(err)=>{throw new Error(err)}})

    this.form = this.formBuilder.group(
      {
        
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            
          ],
        ],
        confirmPassword: ['', Validators.required],
        gender: ['male', [Validators.required]],
        acceptTerms: [false, Validators.requiredTrue],
       
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  username:string="";
  password:string="";
  email:string="";
  gender:string="";
  avatar:string="";
exist:boolean=false;
errorexist:boolean=false;
userexist:boolean=false;
userexisterror:boolean=false;
  onSubmit(): void {

    this.submitted = true;
    this.isSet = true;
     this.exist=this.resgiterlist.some(element=> element.email===this.email);
     this.userexist=this.resgiterlist.some(element=> element.username===this.username);
     this.errorexist=false;
    this.userexisterror=false;
    if(this.gender==="male")
    {
      this.avatar="../../assets/men.png";
    }
    else{
      this.avatar="../../assets/women.png";
    }
  

    if (this.form.invalid ) {
      return;
      
       }
       else if(this.exist==true)
       {
        this.errorexist=true;
           return;
       }
       else if(this.userexist==true)
       {
        this.userexisterror=true;
          return;
       }
    
   else{
    this.correctcode=String(Math.floor(100000+Math.random()*900000));
    var val={mailto:this.email,subject:"كود التحقق",code:this.correctcode};
    this.sendmail.sendemailcode(val).subscribe({next:res=>this.toastr.success("تم ارسال كود التحقق بنجاح"),
    error:(err)=>{throw new Error(err)}});



      this.check=false;
    
    }
  }
adduser(){
  this.codeerror=false;
  var objectuser=
  {
    username:this.username,
    password:this.password,
    email:this.email,
    gender:this.gender,
    avatarpath:this.avatar
  }
  if(this.correctcode==this.code){
      this.http.post("http://localhost:29069/api/registration",objectuser).subscribe(
        {next:data=>{if (data!=null) {
          this.http.post("http://localhost:29069/api/registration/UTokin",
          this.Udata={username:this.form.get("username")?.value,
          password:this.form.get("password")?.value},{responseType:"text"}
          ).subscribe({next:data=>{localStorage.setItem("jwt",data)
          if(data !=null){
            localStorage.setItem("jwt",data)
            var headers=new HttpHeaders().set
            ("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
          this.http.get("http://localhost:29069/api/registration/Auth",{headers,responseType:"text"}).
          subscribe({next:data=>{ 
          sessionStorage.setItem("Email",JSON.parse(data)[0]),
          sessionStorage.setItem("Username",JSON.parse(data)[1]),this.sendUname.emit(true),
          sessionStorage.setItem("Role",JSON.parse(data)[2])
          if(sessionStorage.getItem("Role")=='Admin'){this.sendData()};
          this.toastr.success("تم التسجيل بنجاح")
        },error:(err)=>{throw new Error(err)}})
      }}
    ,error:(err)=>{throw new Error(err)}})
      }
      },error:(err)=>{throw new Error(err)}})
    }  
    else{
  this.codeerror=true;
    }  
        
        
        
        
  
}
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  sendData(){
    this.Isadmin.emit(true)
  }
  
}
