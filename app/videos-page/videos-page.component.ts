import { Component, OnInit } from '@angular/core';
import { videodata } from 'src/app/models/interfaces.file';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SharedserviceService } from '../services/sharedservice.service';
import { ApiService } from '../services/api.service';
import { ICourses_category } from '../models/classes';

@Component({
  selector: 'app-videos-page',
  templateUrl: './videos-page.component.html',
  styleUrls: ['./videos-page.component.scss']
})
export class VideosPageComponent implements OnInit {
  id:any;
  idvideo:any;
  videos:videodata[] =[];
  video:videodata[]=[];
  b:boolean=false;
  categories:ICourses_category[]=[];
  
  constructor(private rout:ActivatedRoute,private router:Router,private service:SharedserviceService,private apiservice:ApiService ,private sharedservice:SharedserviceService) { }

  ngOnInit(): void {
    
    this.rout.paramMap.subscribe((pramas:ParamMap)=>{this.id=pramas.get("id");})
    // console.log(this.id);
  //   this.apiservice.getallcategory().subscribe(cats => {this.categories =cats})
  //  this.categories.filter(w => w.course_Detailesid =this.id);
this.service.GetVideoBYFK(this.id).subscribe(data =>{this.videos=data})
//  this.sharedservice.Getvideos().subscribe(vids =>{this.videos=vids,console.log(this.videos)})  // selectedList =[{},{},{},{}]

      //  this.videos= this.selectedList.filter(v =>{v.courses_Categoryid=this.categories[0].id})

     // this.getfirstvideo();
     
  }
  
 click1(id:any)
 {
 this.b=true;
  this.idvideo=id;
  console.log(this.idvideo);
 }

}
