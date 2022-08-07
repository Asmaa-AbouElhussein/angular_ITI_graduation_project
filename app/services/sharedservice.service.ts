import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Observable, observable} from "rxjs"
import { videodata } from '../models/interfaces.file';
@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
private baseurl:string="http://localhost:29069"
  constructor(private http:HttpClient) { }
Getvideos():Observable<videodata[]>{
return this.http.get<videodata[]>(this.baseurl + "/api/Courses_videos")
}
GetVideoBYId(VideID:number):Observable<any>{
return this.http.get(this.baseurl + "/api/Courses_videos/"+VideID)
}
Addvideo(Vdata:videodata):Observable<any>{
return this.http.post(this.baseurl + '/api/Courses_videos',Vdata)
}

Updatevideo(VideID:number,Udata:videodata):Observable<any>{
  return this.http.put(this.baseurl + '/api/Courses_videos/'+ VideID,Udata)
}
Deletevideo(VideoID:number){
return this.http.delete(this.baseurl + '/api/Courses_videos/'+VideoID)
}

}
