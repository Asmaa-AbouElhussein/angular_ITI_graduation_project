import { Component, Input, OnInit } from '@angular/core';
import { ICategory, ICourses_category } from 'src/app/models/classes';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  constructor(private service:ApiService) { }
color:string="green";
@Input() categoryobj:any;
id:number=0;
name:string="";
course_Detailesid:number=0;
Courses_Detailesidlist:any[]=[];

  ngOnInit(): void {
    this.service.getallcoursesid().subscribe(data=>{this.Courses_Detailesidlist=data})
    this.id=this.categoryobj.id;
    this.name=this.categoryobj.name;
    this.course_Detailesid=this.categoryobj.course_Detailesid;
  }
add()
{
var val={name:this.name,course_Detailesid:this.course_Detailesid};
this.service.addcategory(val).subscribe(res=>{
  alert(res.toString());
});
console.log(val);
}
update(){
  var val={id:this.id,name:this.name,course_Detailesid:this.course_Detailesid};
  this.service.updatecategory(val,this.id).subscribe(res=>{
    alert(res.toString());
  });
}
iderror=true;
validate(value:any){
if(value===0)
{
  this.iderror=true;
}
else{
  this.iderror=false;
}
}
}


