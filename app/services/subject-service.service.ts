import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {

  private updateComment=new Subject<boolean>()
  updateComment$=this.updateComment.asObservable()
  constructor() { }
  sendmessage(flag:boolean){
    this.updateComment.next(flag)
  }
}
