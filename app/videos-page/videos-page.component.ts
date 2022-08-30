import { Component, OnInit } from '@angular/core';
import { videodata } from 'src/app/models/interfaces.file';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SharedserviceService } from '../services/sharedservice.service';
import { ApiService } from '../services/api.service';
import { ICourses_category } from '../models/classes';
import {Location} from '@angular/common';

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
  
  constructor(private rout:ActivatedRoute, private _location: Location,private router:Router,private service:SharedserviceService,private apiservice:ApiService ,private sharedservice:SharedserviceService) { }

  ngOnInit(): void {
    
    this.rout.paramMap.subscribe({next:(pramas:ParamMap)=>{this.id=pramas.get("id");},
    error:(err)=>{throw new Error(err)}})
    
this.service.GetVideoBYFK(this.id).subscribe({next:data =>{this.videos=data},
  error:(err)=>{throw new Error(err)}})

     
  }
  
 click1(id:any)
 {
 this.b=true;
  this.idvideo=id;
 
 }

 backClicked() {
  this._location.back();
}

}
