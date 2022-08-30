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
  };

  ngOnInit(): void {
    this.getAllCourses();
    
  }

  getAllCourses(){
  this.APIservice.getAllCourses().subscribe({next:data=>{this.courseList=data},
    error:(err)=>{throw new Error(err)}});
   }
   getcoursedetailes(id:any){
    this.router.navigate(['/coursedetailes',id])
  }
  getcourse(id:any)
  {
    this.APIservice.getCourseByid(id).subscribe({next:data =>{this.course=data},
      error:(err)=>{throw new Error(err)}})
  }
  
search:string="";
Search()
{
  this.APIservice.getAllCourses().subscribe({next:data=>{this.courseList=data.filter(a=>a.name.includes(this.search))},
    error:(err)=>{throw new Error(err)}});
}

}
