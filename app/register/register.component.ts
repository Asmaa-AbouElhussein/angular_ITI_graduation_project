import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../models/classes';
import {Userdata} from "../models/interfaces.file"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  avatar:string="../../assets/men.png";


  // form: FormGroup = new FormGroup({
  //   fullname: new FormControl(''),
  //   lastname: new FormControl(''),
  //   username: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormControl(''),
  //   phone: new FormControl(''),
  //   gender: new FormControl(''),
  //   acceptTerms: new FormControl(false),
  // });
  form!:FormGroup
  submitted = false;
  isSet = false;
  Udata:Userdata={} as Userdata
  constructor(private formBuilder: FormBuilder,private http:HttpClient) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fristname: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
        ],
        lastname: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
        ],
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

  onSubmit(): void {
    this.submitted = true;
    this.isSet = true;
    if (this.form.invalid) {
      return;
    }else{
    this.http.post("http://localhost:29069/api/registration",this.form.value).subscribe(
      data=>{if (data!=null) {
        this.http.post("http://localhost:29069/api/registration/UTokin",
        this.Udata={username:this.form.get("username")?.value,
        password:this.form.get("password")?.value},{responseType:"text"}
         ).subscribe(data=>localStorage.setItem("jwt",data)
         )
      }
      })
    console.log(JSON.stringify(this.form.value, null, 2));
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
