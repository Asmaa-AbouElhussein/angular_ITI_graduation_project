import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Output,EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Userdata} from "../models/interfaces.file"
import { ApiService } from '../services/api.service';
import { SubjectServiceService } from '../services/subject-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:string=""
  form!:FormGroup
  Ldata:Userdata= {} as Userdata
  submitted = false;
  invalidLogin:boolean=false
  @Output() Isadmin:EventEmitter<boolean>=new EventEmitter()
  @Output() sendUname:EventEmitter<boolean>=new EventEmitter()

  constructor(private formBuilder: FormBuilder,private http:HttpClient,
    private toastr:ToastrService,private subject:SubjectServiceService ,private apiservice:ApiService) {}

  ngOnInit(): void {
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
      
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        
       
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{
      this.http.post("http://localhost:29069/api/registration/UTokin",
      this.Ldata={username:this.form.get("username")?.value,
      password:this.form.get("password")?.value},{responseType:"text"}
       ).subscribe({next:(data:string)=>{
        if(data !=null){
        localStorage.setItem("jwt",data),this.invalidLogin=false
        var headers=new HttpHeaders().set
        ("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
      this.http.get("http://localhost:29069/api/registration/Auth",{headers,responseType:"text"}).
      subscribe({next:data=>{ 
      sessionStorage.setItem("Email",JSON.parse(data)[0]),
      sessionStorage.setItem("Username",JSON.parse(data)[1]),this.sendUname.emit(true)
      sessionStorage.setItem("Role",JSON.parse(data)[2]),
      this.toastr.success("تم التسجيل بنجاح"),this.subject.sendmessage(true)
      this.sendData()
    },error:(err)=>{throw new Error(err)}})
          
      }
      },error:(err)=>{throw new Error(err),this.invalidLogin=true,
        this.toastr.error("حدث خطأ برجاء المحاولة لاحقا")}
        
        })
        this.apiservice.getallpurchasedid(this.user).subscribe({next:(data)=>
          {
            localStorage.setItem("listcourse",JSON.stringify(data));console.log("ok")

            }
          ,error:(err)=>{throw new Error(err)}})
  }
  }
  onReset(): void {
    this.submitted = false;
    this.invalidLogin=false
    this.form.reset();
  }
  sendData(){
    
   if (sessionStorage.getItem("Role")=='Admin'){

    this.Isadmin.emit(true)
    }else{this.Isadmin.emit(false)}
  }
}
