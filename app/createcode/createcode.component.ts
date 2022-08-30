import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { codeData} from '../models/interfaces.file';

@Component({
  selector: 'app-createcode',
  templateUrl: './createcode.component.html',
  styleUrls: ['./createcode.component.scss']
})
export class CreatecodeComponent implements OnInit {

  email:string=""
  selectedItem!:number
  Codedata:codeData={} as codeData
  iscodehidden:boolean=true
  crsdetailsID:number[]=[]
  selectedEmail:string=''
  purchasedEmails:string[]=[]
 
  @ViewChild("parValue",{static:false})parValue!:ElementRef
 constructor(private http:HttpClient,private toastr:ToastrService) { }

 ngOnInit(): void {
 }
 openCodeModel(){
this.http.get<number[]>("http://localhost:29069/api/Course_detailes/Getids").
subscribe({next:(data)=>{this.crsdetailsID=data},error:err=>{throw new Error(err)}})
 }
 
 copyToClipboard(){
  navigator.clipboard.writeText(this.parValue.nativeElement.innerText).
  then(()=>this.toastr.success("تم النسخ بنجاح")).
  catch(()=>{this.toastr.error("حدث خطأ برجاء المحاولة لاحقا")})
  
  
 }
 generateCode(){
  this.iscodehidden=false;
   this.parValue.nativeElement.innerText=Math.floor(100000+Math.random()*900000)
  
   
 }

 onSubmit(){
  
  
   if ( this.parValue.nativeElement.innerText !="" && this.email !="" 
     && this.selectedItem !=null ) {
      
     this.Codedata={email:this.email,code:
        this.parValue.nativeElement.innerText,courseid:this.selectedItem}
    this.http.post("http://localhost:29069/api/VideoCode",this.Codedata,{responseType:"text"}).
    subscribe({next:data=>this.toastr.success("تم الارسال بنجاح"),error:er=>{
    this.toastr.error("حدث خطأ برجاء المحاولة لاحقا")}})

}else{alert("برجاء ملء البيانات")}

 }


 getSavedemails(){
  this.openCodeModel()
  this.http.get<string[]>("http://localhost:29069/api/VideoCode").
  subscribe({next:(data)=>{this.purchasedEmails=data},error:err=>{throw new Error(err)}})
  
 }
 onSubmitDeleteCode(){
  
  
  
  let options={
    headers:new HttpHeaders({
      'content-Type':'application/json'
    }),
    body:{email:this.selectedEmail,crsid:this.selectedItem }
  }
  
  this.http.delete("http://localhost:29069/api/VideoCode",options).
  subscribe({next:(data)=>{this.toastr.success("تم المسح بنجاح")},error:err=>{
   
    this.toastr.error("البيانات غير موجودة")}})
   
  

 }

}
