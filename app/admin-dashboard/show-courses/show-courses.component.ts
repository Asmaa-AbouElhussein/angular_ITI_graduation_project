import { Component, OnInit } from '@angular/core';
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
    date:"",
    code:""
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
    "date": "",
    "code": ""
    }

  constructor(private service:CoursesapiService){}

  getAllCourses(){
    this.service.getAllCourses().subscribe((res: ICoursesDetails[])=>{this.coursesList=res} );

  }
  deleteClick(id:number){
    if(confirm('Are you sure??')){
      this.service.DeleteCourse(id).subscribe(()=>{
        this.getAllCourses();
      })
    }
  }
  closeClick(){
    this.ActivateAddEditcrsComp=false;
    this.getAllCourses();
  }

  ngOnInit() {
    this.getAllCourses();
    //console.log(this.coursesList[1].code);
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
