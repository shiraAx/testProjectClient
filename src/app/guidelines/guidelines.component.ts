import { Component, Input, OnInit } from '@angular/core';
import User from 'src/Models/User';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})
export class GuidelinesComponent implements OnInit{
  
  userFName:string=""
  userLName:string=""
  constructor(public userService:UserService){

  }
  ngOnInit(): void {
   this.userFName=this.userService.getFromStorage()?.FirstName
   this.userLName=this.userService.getFromStorage()?.LastName

  }
}

