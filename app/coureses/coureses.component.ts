import { Component, OnInit } from '@angular/core';
import { ICoursesDetails } from '../models/classes';
import { CoursesapiService } from '../services/coursesapi.service';

@Component({
  selector: 'app-coureses',
  templateUrl: './coureses.component.html',
  styleUrls: ['./coureses.component.scss']
})
export class CouresesComponent implements OnInit {

  constructor(private APIservice:CoursesapiService) { }

  courseList:ICoursesDetails[]=[];
  //list:ICoursesDetails[]=[];
  //res:IData[]=[];

  ngOnInit(): void {
    this.getAllCourses();
    //console.log(this.courseList);
  }

  getAllCourses(){
  this.APIservice.getAllCourses().subscribe(data=>{this.courseList=data,console.log(this.courseList)} );

  //this.APIservice.getAllCourses().subscribe(d=>{this.list=d});
  ;

   }

}
