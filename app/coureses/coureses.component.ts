import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICoursesDetails } from '../models/classes';
import { CoursesapiService } from '../services/coursesapi.service';

@Component({
  selector: 'app-coureses',
  templateUrl: './coureses.component.html',
  styleUrls: ['./coureses.component.scss']
})
export class CouresesComponent implements OnInit {

  constructor(private APIservice:CoursesapiService,private router:Router,){ }

  courseList:ICoursesDetails[]=[];
  course:ICoursesDetails={
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

  ngOnInit(): void {
    this.getAllCourses();
    
  }

  getAllCourses(){
  this.APIservice.getAllCourses().subscribe(data=>{this.courseList=data,console.log(this.courseList)} );
   }
   getcoursedetailes(id:any){
    this.router.navigate(['/coursedetailes',id])
  }
  getcourse(id:any)
  {
    this.APIservice.getCourseByid(id).subscribe(data =>{this.course=data})
  }

}
