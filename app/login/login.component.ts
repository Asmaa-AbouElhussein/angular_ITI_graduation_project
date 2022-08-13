import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Userdata} from "../models/interfaces.file"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!:FormGroup
  Ldata:Userdata= {} as Userdata
  submitted = false;
  invalidLogin:boolean=false
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private toastr:ToastrService) {}

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
        localStorage.setItem("jwt",data),this.invalidLogin=false,this.toastr.success("تم التسجيل بنجاح")}},error:(err)=>{throw new Error(err),this.invalidLogin=true}
        
        })
   
  }
  }
  onReset(): void {
    this.submitted = false;
    this.invalidLogin=false
    this.form.reset();
  }
}
