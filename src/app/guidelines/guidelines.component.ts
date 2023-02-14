import { Component, Input, OnInit } from '@angular/core';
import User from 'src/Models/User';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})
export class GuidelinesComponent implements OnInit{

  user:User=new User(0,"","","", [],0,0,new Date())

constructor(public userService:UserService){}
  ngOnInit(): void {
    this.userService.currentUser.subscribe(data=>{this.user=data})
  }
  logOut(){
    this.userService.currentUser.next(null)
    this.userService.removeFromStorage();
}

}