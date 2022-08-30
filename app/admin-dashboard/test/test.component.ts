import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { videodata } from 'src/app/models/interfaces.file';
import { SharedserviceService } from 'src/app/services/sharedservice.service';
import { VideoFormComponent } from '../video-form/video-form.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit,OnChanges {
  
  @ViewChild(VideoFormComponent,{static:false})videoform!:VideoFormComponent
  
     GetFk:number[]=[]
     @Input() 
     selectedList:videodata[]=[]
     ModalTitle!:string
    
  constructor(private http:HttpClient,
    private shared:SharedserviceService,private toastr:ToastrService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
     
  }
    
     
        
 
 

  ngOnInit(): void {
    this.GetFk=[]
    this.showData()
    
  }
  refreshData(){
    this.showData()
    this.videoform.datalist={} as videodata

  }

  
  showData(){
    this.GetFk=[]
    this.shared.Getvideos().subscribe({next:data=>{this.selectedList=data.sort((a,b)=>(a.courses_Categoryid<b.courses_Categoryid?-1:1));}
    
    
  ,error:(err)=>{throw new Error(err)}})

    }
      
    Getfks(){
      this.http.get<number[]>("http://localhost:29069/api/Courses_category/Getids"
      ).subscribe({next:(data)=>
      {this.GetFk.push(...data)
        }
      ,error:(err)=>{throw new Error(err)}})
    }
      

     
    
  Update(id:number){
   this.Getfks();
    this.shared.GetVideoBYId(id).subscribe({next:data=>
     { this.videoform.datalist=data
    }
  ,error:(err)=>{throw new Error(err)}});
    this.ModalTitle="تعديل";
  }
  
  delete(item:videodata){
    if(confirm('هل تريد حذف الكورس ؟؟'))
    {
    this.shared.Deletevideo(item.id).subscribe({next:data=>{
      this.toastr.success("تم المسح بنجاح")
     
      this.showData();
    },error:(err)=>{throw new Error(err)}})
    if (item.videopath!=undefined) {
      
      this.http.delete("http://localhost:29069/api/Video_Upload",{params:new HttpParams().set("filepath",item.videopath)}
      ).subscribe({next:data=>this.toastr.success("تم مسح الفيديو بنجاح"),
     error:(err)=>{throw new Error(err)}})
    
    
    }
    
    }
      }

      add(){
        this.Getfks();
        this.ModalTitle="أضافه فيديو جديد";
  
      }  

}
