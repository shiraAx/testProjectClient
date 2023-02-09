import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Child from 'src/Models/Child';


@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(public http:HttpClient) { }
  GetChildren():Observable<Child[]>{
    return this.http.get<Child[]>("https://localhost:7146/api/Children")
  }
  GetChild(id:string):Observable<Child>{
   return this.http.get<Child>(`https://localhost:7146/api/Children/${id}`)
 }

 PostChild(child: Child){
   return this.http.post("https://localhost:7146/api/Children",child)
 }
 DeleteChild(id:string){
   return this.http.delete(`https://localhost:7146/api/Children/${id}`)
 }
}
