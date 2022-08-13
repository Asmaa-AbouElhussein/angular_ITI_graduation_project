import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
 
 res:IData[]=[];
 // imgpath:string="";
 //   price:number=0;
 //   discount:number=0;
 //   discription:string="";
 //   numberofvideos:string="";
 //   numberofhours:string="";
 //   date:string="";
 
 constructor(private service:CoursesapiService,private sendbroadcast:ApiService) { }


 ngOnInit(): void {
   // this.id=this.course.id;
   // this.name=this.course.name;
   // this.code=this.course.code;
   // this.imgpath=this.course.imgpath;
   // this.price=this.course.price;
   // this.discount=this.course.discount;
   // this.discription=this.course.discription;
   // this.numberofvideos=this.course.numberofvideos;
   // this.numberofhours=this.course.numberofhours;
   // this.date=this.course.date;
 }
 onSubmit(){

   if(this.course.id ==0){
     var val1={
       "name": this.course.name,
       "imgpath": this.course.imgpath,
       "price": this.course.price,
       "discount": this.course.discount,
       "description": this.course.description,
       "numberofvideos": this.course.numberofvideos,
       "numberofhours": this.course.numberofhours,
       "date": this.course.date,
       "code": this.course.code
       }
      this.service.AddCourse(val1).subscribe((res: any)=>{console.log(res)} );
      var emalsend={subject:"تم أضافه كورس جديد",body:this.course.name}
      this.sendbroadcast.sendbroadcast(emalsend).subscribe(res=>console.log(res));
     }
   else{
     this.EditCourse(this.course);}
   
     this.ActivateAddEditcrsC=false;
     this.sendData();

   
 }

 EditCourse(dataitem:ICoursesDetails){
   this.course = dataitem;
   this.service.UpdateCourse(this.course.id,this.course).subscribe((res: any)=>{console.log(res)})   
   
 }

 uploadPhoto(event:any){
   var file=event.target.files[0];
   const formData:FormData=new FormData();
   formData.append('files',file);

   this.service.UploadPhoto(formData).subscribe((data)=>{
     
     this.res=data as IData[]; 
     
     if (this.res.length>0){
       this.course.imgpath = this.res[0].name;
     

     }
   });
 }

 sendData(){
   this.ActivateAddEditcrsComp.emit(this.ActivateAddEditcrsC);
   
 }
}
