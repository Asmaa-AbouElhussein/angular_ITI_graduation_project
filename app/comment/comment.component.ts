import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  // coursesList:ICoursesDetails[]=[];
  ModalTitle = 'اضافة تعليق';
  ActivateAddEditcrsComp: boolean = false;
   islogged:boolean=false
  // course:ICoursesDetails ={
  //   id:0,
  //   name:"",
  //   imgpath:"",
  //   price:0,
  //   discount:0,
  //   description:"",
  //   numberofvideos:0,
  //   numberofhours:0,
  //   date:"",
  //   code:""
  // };
  constructor() { }

  ngOnInit(): void {
  }
  onSwiper([swiper]: any): void {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
  addClick() {
    this.ModalTitle = "اضافة تعليق";
    this.ActivateAddEditcrsComp = true;

  }
  closeClick() {
    this.ActivateAddEditcrsComp = false;
  }
  checkLogin(){
    
    
    if (localStorage.getItem("jwt")!=null) {
      this.islogged=true
    }
   
  }


}
