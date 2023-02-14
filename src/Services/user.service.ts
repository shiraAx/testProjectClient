import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from 'src/Models/User';
import { BehaviorSubject, Subject } from 'rxjs';
import Child from 'src/Models/Child';
@Injectable({
  providedIn: 'root'
})
export class UserService {
formData:User

  constructor(public http:HttpClient) { }
  GetParents():Observable<User[]>{
    return this.http.get<User[]>("https://localhost:7146/api/Parents")
  }
  GetParent(id:string):Observable<User>{
   return this.http.get<User>(`https://localhost:7146/api/Parents/${id}`)
 }

 PostParent(user: User){
   return this.http.post("https://localhost:7146/api/Parents",user)
 }
 DeleteParent(id:string){
   return this.http.delete(`https://localhost:7146/api/Parents/${id}`)
 }

 currentUser = new BehaviorSubject<{Id:number,ParentId :string,  FirstName :string, LastName :string,  Children :Child[],GenderType :number,HMOType :number,BirthDate :Date }>(null);
 setInStorage(user){
  localStorage.setItem("curUser",JSON.stringify(user));
}
removeFromStorage(){
  localStorage.removeItem("curUser");
}
getFromStorage(){
  let u=localStorage.getItem("curUser")
if(u==null)  
return null;
return JSON.parse(u);
}
}
