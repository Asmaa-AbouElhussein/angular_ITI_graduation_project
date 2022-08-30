import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICoursesDetails } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class CoursesapiService {

  baseURL = environment.Api+"/api"
  constructor(private http:HttpClient) { }

  // Get All Courses
  getAllCourses():Observable<ICoursesDetails[]>{
    return this.http.get<ICoursesDetails[]>(this.baseURL+'/Course_detailes')
  }

  // Delete One Course
  DeleteCourse(id:number):Observable<ICoursesDetails>{
    return this.http.delete<ICoursesDetails>(this.baseURL+'/Course_detailes/'+id)

  }

  // Add New Course
  AddCourse(val:any):Observable<any>{
    return this.http.post<any>(this.baseURL+'/Course_detailes', val)
  }

  // Update Course
  UpdateCourse(id:number,item:ICoursesDetails):Observable<ICoursesDetails>
  {
    return this.http.put<ICoursesDetails>(this.baseURL+'/Course_detailes/'+id,item)
  }
  UploadPhoto(val:any){
    return this.http.post(this.baseURL+'/UploadPhoto',val);
  }
  getallcoursesid():Observable<ICoursesDetails["id"][]>
  {
return this.http.get<ICoursesDetails["id"][]>(this.baseURL+'/Course_detailes');
  }
  getCourseByid(id:number):Observable<ICoursesDetails>
  {
    return this.http.get<ICoursesDetails>(this.baseURL+'/Course_detailes/'+id);
  }
  HaveAccess(){
    
    if (sessionStorage.getItem("Email")==null) {
      var headers=new HttpHeaders().set
        ("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
      this.http.get("http://localhost:29069/api/registration/Auth",{headers,responseType:"text"}).
      subscribe({next:(data)=>{ 
      sessionStorage.setItem("Email",JSON.parse(data)[0]),
      sessionStorage.setItem("Username",JSON.parse(data)[1]),
      sessionStorage.setItem("Role",JSON.parse(data)[2])
    },error:(err)=>{throw new Error(err)}}
      )}
      if (sessionStorage.getItem("Role")=='Admin'){
    

        return true;
    }else{ 
      
    
      
      
    
    alert('لا توجد لديك السماحية برجاء التسجيل اولا');
    return false;
    }
  }
 
}
