import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { observable, Observable, Subscription, throwError } from 'rxjs';
import { videodata, videopath } from 'src/app/models/interfaces.file';
import { SharedserviceService } from 'src/app/services/sharedservice.service';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit, OnDestroy {
  @Output() ParentFunction: EventEmitter<any> = new EventEmitter()
  datalist: videodata = {} as videodata
  private checkSub!: Subscription
  private file: any
  private VideoPath: string[] | undefined = []
  res: videopath[] = []
  err:boolean=false;
  err2:boolean=false;
  @Input() FKS!: number[]
  constructor(private http: HttpClient, private shared: SharedserviceService
    ,private toastr:ToastrService) { }
  
    ngOnInit(): void {
     
     
    }





  async onFormSubmit() {
    if (this.datalist.id != null) {
         
      var id: number = this.datalist.id
      this.checkSub = this.shared.Updatevideo(id, this.datalist).subscribe()
      this.err2=false;
     
    } else {
     
      
    
    
      
      if (this.file != null) {
        var formData = new FormData
        formData.append('Files', this.file)
        this.checkSub= this.http.post('http://localhost:29069/api/Video_Upload', formData).
          subscribe({next:(data) => {
           
            this.res = data as videopath[];
            if (this.res.length > 0) {



              this.VideoPath = this.res.map((e) => { return e.name })


             

              if (this.VideoPath != undefined && this.VideoPath.length > 0) {
                for (const item of this.VideoPath) {


                  this.datalist.videopath = item
                 

                  this.checkSub = this.shared.Addvideo(this.datalist).subscribe({
                    next:(data) =>{ this.toastr.success("تم الاضافة بنجاح");} 
                ,error:(err)=>{throw new Error(err)}})
                 
                  this.err2=false;
                }
              }

            } else {

              this.err2=true;
            }





          },error: error => throwError(() => new Error("error happened" + error)
          )})

        this.err=false;

      } else {
        this.err=true;


      }
this.ngOnInit()
    }

  }

  selectfile(e: any) {
    this.file = e.target.files[0]
    
    

  }



  ngOnDestroy(): void {
    if(this.checkSub!=undefined){
    this.checkSub.unsubscribe()
    }
  }



}
