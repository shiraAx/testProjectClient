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

child:Child=new Child(0,"","",new Date())
user:User=new User(0,"","","", [],0,0,new Date())
children:Child[]=[]

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


}
