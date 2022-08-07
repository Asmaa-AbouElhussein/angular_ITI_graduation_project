export interface ICourse_detailes
    {
        
         id:number;
          name:string;
          imgpath:string;
          price:number; 
          discount:number;
          description:string;
          numberofvideos :string;
          numberofhours:string ;
          date :string;
          code :string;

    }
    export interface ICourses_category
    {
        
          id:number;
          name:string;
          course_Detailesid :number;

    }
    export interface ICategory
    {
        
          name:string;
          course_Detailesid :number;

    }
import { AbstractControl, ValidatorFn } from '@angular/forms';
export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
export interface IData {
  name:string;
  lenght:number;
}
export interface ICoursesDetails {
  id:number;
  name:string;
  imgpath:string;
  price:number;
  discount:number;
  description:string;
  numberofvideos:number;
  numberofhours:number;
  date:string;
  code:string;
}
