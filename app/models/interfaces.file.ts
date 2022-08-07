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