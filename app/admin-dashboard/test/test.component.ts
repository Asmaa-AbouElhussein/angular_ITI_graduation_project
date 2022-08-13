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
    console.log("yy");
     
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
    this.shared.Getvideos().subscribe(data=>
      {this.selectedList=data,
      console.log(data)
    
    }
      )

    }
      
    Getfks(){
      this.http.get<number[]>("http://localhost:29069/api/Courses_category/Getids"
      ).subscribe((data)=>
      {this.GetFk.push(...data)
        }
        )
    }
      

     
    
  Update(id:number){
   this.Getfks();
    this.shared.GetVideoBYId(id).subscribe(data=>
     { this.videoform.datalist=data
    }
    );
    this.ModalTitle="تعديل";
  }
  
  delete(item:videodata){
    if(confirm('Are you sure??'))
    {
    this.shared.Deletevideo(item.id).subscribe(data=>{
      this.toastr.success("تم المسح بنجاح")
     
      this.showData();
    })
    if (item.videopath!=undefined) {
      
      this.http.delete("http://localhost:29069/api/Video_Upload",{params:new HttpParams().set("filepath",item.videopath)}
      ).subscribe(data=>
       console.log(data)
       
      )
    
    
    }
    
    }
      }

      add(){
        this.Getfks();
        this.ModalTitle="أضافه فيديو جديد";
  
      }  

}
