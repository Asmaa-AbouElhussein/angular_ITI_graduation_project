import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private service:SharedserviceService,private sendmail:ApiService) {}
  resgiterlist:any[]=[];

  ngOnInit(): void {
this.getallregister();
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
        address: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
           
          ],
        ],
        phonenumber: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(01)(0|1|2|5)[0-9]{8}$/),
          ],
        ],
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
  address:string="";
  password:string="";
  phone:string="";
  email:string="";
  gender:string="";
  avatar:string="";
exist:boolean=false;
errorexist:boolean=false;
userexist:boolean=false;
userexisterror:boolean=false;
  onSubmit(): void {
   this.getallregister();
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
this.sendmail.sendemailcode(val).subscribe(res=>{
  console.log(res);
});
console.log(val);
console.log(this.correctcode);


      this.check=false;
    
    }
  }
adduser(){
  this.codeerror=false;
  var objectuser=
  {
    username:this.username,
    address:this.address,
    password:this.password,
    phonenumber:this.phone,
    email:this.email,
    gender:this.gender,
    avatarpath:this.avatar
  }
  if(this.correctcode==this.code){
    
    
      this.http.post("http://localhost:29069/api/registration",objectuser).subscribe(
        data=>{if (data!=null) {
             
             
          this.http.post("http://localhost:29069/api/registration/UTokin",
          this.Udata={username:this.form.get("username")?.value,
          password:this.form.get("password")?.value},{responseType:"text"}
          ).subscribe(data=>localStorage.setItem("jwt",data)
          )
        }
        })
        // window.location.reload();
  }  
  else{
this.codeerror=true;
  }  
  
}
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  getallregister(){
    this.service.Getallregister().subscribe(data=>{this.resgiterlist=data});

  }
}
