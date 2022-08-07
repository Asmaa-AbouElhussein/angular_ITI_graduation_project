import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private prop!:string;
  public flag:boolean=false
  @ViewChild('inputprg',{static:true}) inputprg!:ElementRef;
 @ViewChild('span1',{static:true}) Fspan!:ElementRef;
  constructor() {}

  
  ngOnInit(): void {
    this.prop=this.inputprg.nativeElement.innerText
     this.inputprg.nativeElement.innerText=this.prop.substring(0,85)
    
    }

    showMore(){
      if(this.flag==false){    
      this.inputprg.nativeElement.innerText=this.prop.substring(0)
      this.flag=true
      this.Fspan.nativeElement.innerText="show less"
      }else{
        this.inputprg.nativeElement.innerText=this.prop.substring(0,85)
        this.flag=false
      this.Fspan.nativeElement.innerText="show more"
  
      }
    }
}
