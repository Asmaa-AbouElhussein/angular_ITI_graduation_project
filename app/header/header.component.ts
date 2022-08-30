import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectServiceService } from '../services/subject-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isAdmin: boolean = false
  Username!: string | null;
  login: boolean = false;
  constructor(private subject: SubjectServiceService,private http:HttpClient,private toastr:ToastrService) { }

  ngAfterViewInit(): void {
    this.subject.updateComment$.subscribe({
      next:
        data => {
          if (data) {

            this.ngOnInit()
          }
        }, error: (err) => { throw new Error(err) }
    }
    )
  }


  ngOnInit(): void {
    
    if (localStorage.getItem("jwt")!=null && sessionStorage.getItem("Username")==null)
    { 
      var headers=new HttpHeaders().set
      ("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
      
    this.http.get("http://localhost:29069/api/registration/Auth",{headers,responseType:"text"}).
    subscribe({next:data=>{ 
      
    sessionStorage.setItem("Email",JSON.parse(data)[0]),
    sessionStorage.setItem("Username",JSON.parse(data)[1])
    sessionStorage.setItem("Role",JSON.parse(data)[2]);

    this.checkUserCredinitials()
    this.toastr.success("تم التسجيل بنجاح")
  },error:(err)=>{throw new Error(err)}})

     this.login=true;
    }

   this.checkUserCredinitials()
    
        
  }
  onChange() {

    this.ngOnInit()
  }
  checkAdminState(data: boolean) {

    this.isAdmin = data
  }
  DisplayName(data: boolean) {
    if (data == true && sessionStorage.getItem("Username") != null) {
      this.Username = sessionStorage.getItem("Username")
    }
    if (localStorage.getItem("jwt") != null) {
      this.login = true;
    }
  }
  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("listcourse");
    sessionStorage.removeItem("Username")
    sessionStorage.removeItem("Email")
    sessionStorage.removeItem("Role") 
    //this.login=false;
    window.location.reload()
  }

  refresh() {
    // window.location.reload();
  }
  isCollapsed = false;
  message = 'expanded';

  collapsed(): void {
    this.message = 'collapsed';
  }

  collapses(): void {
    this.message = 'collapses';
  }

  expanded(): void {
    this.message = 'expanded';
  }

  expands(): void {
    this.message = 'expands';
  }
  menuVariable: boolean = false
  openmenu() {
    this.menuVariable = !this.menuVariable
    this.menu_icon_variable = !this.menu_icon_variable
  }
  menu_icon_variable: boolean = false

   checkUserCredinitials(){
    if(sessionStorage.getItem("Role",)=="Admin"){
      this.isAdmin=true
   }
   else{this.isAdmin=false}
   
   if(sessionStorage.getItem("Username")!=null){
     this.Username=sessionStorage.getItem("Username")
     this.login = true;
       }
    
   }
}
