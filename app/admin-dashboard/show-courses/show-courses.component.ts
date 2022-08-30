import { HttpClient ,HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICoursesDetails } from 'src/app/models/classes';
import { CoursesapiService } from 'src/app/services/coursesapi.service';

@Component({
  selector: 'app-show-courses',
  templateUrl: './show-courses.component.html',
  styleUrls: ['./show-courses.component.scss']
})
export class ShowCoursesComponent implements OnInit {

  coursesList:ICoursesDetails[]=[];
  ModalTitle='اضافة كورس';
  ActivateAddEditcrsComp:boolean=false;
  course:ICoursesDetails ={
    id:0,
    name:"",
    imgpath:"",
    price:0,
    discount:0,
    description:"",
    numberofvideos:0,
    numberofhours:0,
    date:""
    };
  val2:any={
    "id":0,
    "name": "",
    "imgpath": "",
    "price": 0,
    "discount": 0,
    "description": "",
    "numberofvideos": 0,
    "numberofhours": 0,
    "date": ""
    }

  constructor(private service:CoursesapiService , private toastr:ToastrService , private http:HttpClient){}

  getAllCourses(){
    this.service.getAllCourses().subscribe({next:(res: ICoursesDetails[])=>{this.coursesList=res},
    error:(err)=>{throw new Error(err)}} );

  }
  deleteClick(id:number){
    if(confirm('Are you sure??'))
    {
      this.service.DeleteCourse(id).subscribe({next:data=>{
      this.toastr.success("تم المسح بنجاح")
     
      this.getAllCourses();
    },error:(err)=>{throw new Error(err)}})
    if (this.course.imgpath!=undefined) {
      
      this.http.delete("http://localhost:29069/api/UploadPhoto",{params:new HttpParams().set("filepath",this.course.imgpath)}).subscribe({next:data=>this.toastr.success("تم مسح الفيديو بنجاح"),
     error:(err)=>{throw new Error(err)}})
    
    
       }
    
     }
  }



  closeClick(){
    this.getAllCourses();
    this.ActivateAddEditcrsComp=true;
  }

  ngOnInit() {
    this.getAllCourses();
  }
  addClick(){
    this.course=this.val2;
    this.ModalTitle="اضافة كورس";
    this.ActivateAddEditcrsComp=true;

  }
  editClick(dataitem:any){
    this.course = dataitem;
    this.ModalTitle="تعديل كورس";
    this.ActivateAddEditcrsComp=true;
  }

  RecieveDate(event:boolean){
    this.ActivateAddEditcrsComp=event;
    //this.closeClick();
    this.getAllCourses();
  }
}
