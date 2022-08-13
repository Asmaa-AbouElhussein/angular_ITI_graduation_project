import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICourses_category } from 'src/app/models/classes';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss']
})
export class ShowCategoryComponent implements OnInit {
  constructor(private service:ApiService,private toastr:ToastrService) { }
  ActivateAddandEdit:boolean=false;
  ModalTitle:string="";
  categoryobj:any;
  categorylist:ICourses_category[]=[];
  
  addClick()
  {
  this.categoryobj={
    id:0,
  name:"",
  course_Detailesid:0
  }
this.ModalTitle="أضافه عنوان جديد";
this.ActivateAddandEdit=true;
  }  
  closeClick(){
    this.ActivateAddandEdit=false;
    this.refreshdata();
  }
  editClick(item: any)
  {
this.categoryobj=item;
this.ModalTitle="تعديل";
this.ActivateAddandEdit=true;

  }
  delete(item:any){
    if(confirm('هل تريد مسح العنصر ؟؟'))
    {
    this.service.deltecategory(item.id).subscribe(data=>{
      alert(data.toString());}); 
    }
    window.location.reload();
  }
  ngOnInit(): void {
    this.refreshdata();
   
  }
  refreshdata()
  {
    this.service.getallcategory().subscribe(data=>{this.categorylist=data})
  }

}
