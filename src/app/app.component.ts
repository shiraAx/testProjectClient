import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit,OnDestroy{
  title = 'testProjectClient';
  constructor(public userService:UserService){}
  ngOnDestroy(): void {
    this.logOut()
  }

  ngOnInit(): void {
   this.userService.currentUser.next(this.userService.getFromStorage())
  }
  logOut(){
    this.userService.currentUser.next(null)
    this.userService.removeFromStorage();
  }


}
