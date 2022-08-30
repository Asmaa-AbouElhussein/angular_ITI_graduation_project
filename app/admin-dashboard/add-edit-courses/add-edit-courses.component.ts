import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICoursesDetails, IData } from 'src/app/models/classes';
import { ApiService } from 'src/app/services/api.service';
import { CoursesapiService } from 'src/app/services/coursesapi.service';

@Component({
  selector: 'app-add-edit-courses',
  templateUrl: './add-edit-courses.component.html',
  styleUrls: ['./add-edit-courses.component.scss']
})
export class AddEditCoursesComponent implements OnInit {

 @Input() course:any;
 @Output() ActivateAddEditcrsComp:EventEmitter<boolean>=new EventEmitter();
 Courses_Detailesidlist:any[]=[{}];
 ActivateAddEditcrsC:boolean=true;
 courses:ICoursesDetails[] =[];
 res:IData[]=[];

 
 constructor(private service:CoursesapiService,private sendbroadcast:ApiService,private toastr:ToastrService) { }


 ngOnInit(): void {

 }
 onSubmit(){
  let today = new Date().toISOString().slice(0, 10)
   if(this.course.id ==0){
     var val1={
       "name": this.course.name,
       "imgpath": this.course.imgpath,
       "price": this.course.price,
       "discount": this.course.discount,
       "description": this.course.description,
       "numberofvideos": this.course.numberofvideos,
       "numberofhours": this.course.numberofhours,
       "date":today,
      
       }
       this.service.AddCourse(val1).subscribe({next:res=>this.toastr.success("تم اضافه الكورس  بنجاح"), 
       error:(err)=>{throw new Error(err)}});
      var emalsend={subject:"تم أضافه كورس جديد",body:this.course.name}
      this.sendbroadcast.sendbroadcast(emalsend).subscribe({next:res=>this.toastr.success("تم ارسال اشعار اضافه كورس الى جميع المشتركين بنجاح"),
      error:(err)=>{throw new Error(err)}});     }
   else{
     this.EditCourse(this.course);
    }
   
     this.sendData();
 }

 EditCourse(dataitem:ICoursesDetails){
   this.course = dataitem;
   this.service.UpdateCourse(this.course.id,this.course).subscribe({next:res=>this.toastr.success("تم التعديل بنجاح"), 
   error:(err)=>{throw new Error(err)}   })      
 }

 uploadPhoto(event:any){
   var file=event.target.files[0];
   const formData:FormData=new FormData();
   formData.append('files',file);

   this.service.UploadPhoto(formData).subscribe({next:(data)=>{
     
     this.res=data as IData[]; 
     
     if (this.res.length>0){
       this.course.imgpath = this.res[0].name;
     

     }
   }, error:(err)=>{throw new Error(err)}});
 }

 sendData(){
   this.ActivateAddEditcrsComp.emit(this.ActivateAddEditcrsC);
   
 }
//  ForUniqueCourseName(){
//   let crsName = document.getElementById('crsName') as HTMLInputElement | null;;
//   let naMe = crsName?.value
  
//   this.service.getAllCourses().subscribe(data => this.courses=data);
  
//   this.courses.forEach(element => {
//     if (element.name==naMe) {
//       return true;
//     }
//     else{
//       return false;
//     }
//   });
// }
}
