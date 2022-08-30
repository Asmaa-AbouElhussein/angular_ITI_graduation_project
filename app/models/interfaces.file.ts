export interface videodata {
    id:number,
    name:string,
    description:string,
    videopath:string|undefined,
    courses_Categoryid:number
}

export interface videopath {
   
    name:string,
    lenght:number
}
export interface Userdata {
   
    username:string,
    password:string
}

export interface UserComment {
    
    Email:string,
    comment:string
}
   
export interface commentData {
    
    comment:string,
    userName:string,
    avatarpath:string,
    date:string
}
    
export interface  aboutusEmail {
    
    Email:string,
    body:string,
    name:string,
}
    
export interface  codeData {
    
    email:string,
    code:string,
    courseid:number,
}
export interface  sendermess {
    
    Sender:string,
    Receiver:string,
    message:string,
}
 
export interface  messRec {
    
    message:string,
     date:Date,
     sender:string
}

