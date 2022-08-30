import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { CoursesapiService } from '../services/coursesapi.service';
import { ICoursesDetails } from '../models/classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private prop!:string;
  public flag:boolean=false
  @ViewChild('inputprg',{static:true}) inputprg!:ElementRef;
 @ViewChild('span1',{static:true}) Fspan!:ElementRef;
  constructor(private APIservice:CoursesapiService,private router:Router) {}
  courses:ICoursesDetails[]=[];
  
  ngOnInit(): void {
  
    }
    ngAfterViewInit() {
      this.getAllCourses();
    }
    getAllCourses(){
      this.APIservice.getAllCourses().subscribe({next:data=>{this.courses=data}, 
        error:(err)=>{throw new Error(err)}});
       }
       
       getcoursedetailes(id:any){
        this.router.navigate(['/coursedetailes',id])
      }


      
    // showMore(){
    //   if(this.flag==false){    
    //   this.inputprg.nativeElement.innerText=this.prop.substring(0)
    //   this.flag=true
    //   this.Fspan.nativeElement.innerText="show less"
    //   }else{
    //     this.inputprg.nativeElement.innerText=this.prop.substring(0,85)
    //     this.flag=false
    //   this.Fspan.nativeElement.innerText="show more"
  
    //   }
    // }
}
