import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { commentData, UserComment } from "../models/interfaces.file"
import { SubjectServiceService } from '../services/subject-service.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, AfterViewInit {
  usersComments: commentData[] = []
  commentData: UserComment = {} as UserComment
  invalidComment: boolean = false
  ModalTitle = 'اضافة تعليق';
  ActivateAddEditcrsComp: boolean = false;
  islogged: boolean = false
  userName!: string | null

  swiperConfig: any = {
    // slidesPerView: 'auto',

    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      970: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1170: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1920: {
        slidesPerView: 4,
        spaceBetween: 60,
      }
    },
    autoplay:
    {
      delay: 1000,
      disableOnInteraction: false
    },
    pagination:
    {
      clickable: true
    },
    scrollbar:
    {
      draggable: true
    },
    loop: true,
    allowTouchMove: true,
    autoHeight: true,
    delay: 1000,
    disableOnInteraction: false,
    clickable: true,
    navigation: true,
    draggable: true
  }

  constructor(private http: HttpClient, private subject: SubjectServiceService, private toastr: ToastrService) { }

  ngAfterViewInit(): void {
    this.subject.updateComment$.subscribe({
      next:
        data => {
          if (data) {

            this.ngOnInit()
          }
        }
      , error: (err) => { throw new Error(err) }
    })
  }


  ngOnInit(): void {
    this.http.get<commentData[]>("http://localhost:29069/api/comments").subscribe({next:data=>
    {this.usersComments=data
      
      
      
    },error:(err)=>{throw new Error(err)}})
   setTimeout(() => {
    this.userName=sessionStorage.getItem("Username")
   }, 1000);  
    
  }
  onSwiper([swiper]: any): void {

  }
  onSlideChange() {

  }
  addClick() {

    this.ModalTitle = "اضافة تعليق";
    this.ActivateAddEditcrsComp = true;

  }
  closeClick() {

    this.ActivateAddEditcrsComp = false;
    if (!this.islogged) {

    }
  }
  checkLogin() {

    this.islogged = false
    if (localStorage.getItem("jwt") != null && localStorage.getItem("Email") == null) {

      var headers = new HttpHeaders().set
        ("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
      this.http.get("http://localhost:29069/api/registration/Auth", { headers, responseType: "text" }).
        subscribe({
          next: data => {
            sessionStorage.setItem("Email", JSON.parse(data)[0]),
              sessionStorage.setItem("Username", JSON.parse(data)[1]),
              this.userName = sessionStorage.getItem("Username")
            this.islogged = true

          }
          , error: (err) => { throw new Error(err) }
        })


    } else if (localStorage.getItem("jwt") == null) {


      this.islogged = false;
    }

  }

  submitComment(element: HTMLTextAreaElement) {

    if (element.value != "") {
      let email = sessionStorage.getItem("Email")
      if (email != null) {


        this.commentData = { Email: email, comment: element.value }


        this.http.post("http://localhost:29069/api/comments", this.commentData, { responseType: "text" })
          .subscribe({
            next: data => { this.toastr.success(data), this.ngOnInit(), element.value = "" }, error: error => { throw new Error(error) }
          }
          )
      } else {
        ///////////////
      }
    } else {
      this.invalidComment = true
      setTimeout(() => {
        this.invalidComment = false
      }, 1500);
    }
  }
  deleteComment(Uname: string) {

    this.http.delete("http://localhost:29069/api/comments",
      { params: new HttpParams().set("uname", Uname), responseType: "text" }).
      subscribe({
        next: data => { this.toastr.success(data), this.ngOnInit() },
        error: (err) => this.toastr.error("حدث خطأ بالرجاء المحاولة لاحقا")
      })
  }

  DisplayNameinComment(data: boolean) {
    if (data) {

      this.ngOnInit()
    }
  }

  checkcommentsLenght() {

    if (this.usersComments.length > 3) {
      return true
    }
    return false
  }
}