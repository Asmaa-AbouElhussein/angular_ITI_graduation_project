import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoursesDetails } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class CoursesapiService {

  baseURL = "http://localhost:29069/api"
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
}
