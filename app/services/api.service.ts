import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, ICourses_category, ICourse_detailes } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
readonly Apiurl="http://localhost:29069/api";
  constructor(private http:HttpClient) { }
  getallcategory():Observable<ICourses_category[]>
  {
return this.http.get<ICourses_category[]>(this.Apiurl+'/Courses_category');
  }
  addcategory(val:any)
  {
    return this.http.post(this.Apiurl+'/Courses_category',val,{responseType:'text'});
  }
  updatecategory(val:any ,id:number)
  {
    return this.http.put(this.Apiurl+'/Courses_category/'+id,val,{responseType:'text'});
  }
deltecategory(val:any)
  {
return this.http.delete(this.Apiurl+'/Courses_category/'+val,{responseType:'text'});
  }
  getallcoursesid():Observable<ICourse_detailes["id"][]>
  {
return this.http.get<ICourse_detailes["id"][]>(this.Apiurl+'/Course_detailes');
  }
  getuser():Observable<any[]>
  {
return this.http.get<any[]>(this.Apiurl+'/registration');
  }
  adduser(val:any)
  {
    return this.http.post(this.Apiurl+'/registration',val,{responseType:'text'});
  }
  sendemailcode(val:any)
  {
    return this.http.post(this.Apiurl+'/sendverification',val);
  }
  sendbroadcast(val:any)
  {
    return this.http.post(this.Apiurl+'/broadcastemail',val);
  }
  getallpurchased():Observable<any[]>
  {
return this.http.get<any[]>(this.Apiurl+'/purchasedcourses');
  }
  GetCatBYFK(VideID:number):Observable<any>{
    return this.http.get(this.Apiurl + "/Courses_category/Get_category/"+VideID)
    }
}
