import { Component, EventEmitter, OnInit,Output,ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import Child from 'src/Models/Child';
import { Gender } from 'src/Models/Gender';
import { HMO } from 'src/Models/HMO';
import User from 'src/Models/User';
import { UserService } from 'src/Services/user.service';
import { FormsModule,Validators } from '@angular/forms';
import { ChildService } from 'src/Services/child.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FloatLabelType } from '@angular/material/form-field';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
child:Child=new Child(0,"","",new Date())
user:User=new User(0,"","","", [],0,0,new Date())




genderArr=Gender
hmoArr=HMO
children:Child[]=[]

panelOpenState:boolean
@ViewChild('myForm') form:any
constructor(public userService:UserService,public childServise:ChildService){
}

userFName:string=""
userLName:string=""
userID:string=""
userDate:string=""
userGender:string=""
userHMo:string=""
  resetForm(myForm:NgForm){
    if(myForm!=null)
    myForm.reset()
  }
  ngOnInit(): void {
    this.userFName=this.userService.getFromStorage()?.FirstName
    this.userLName=this.userService.getFromStorage()?.LastName
    this.userID=this.userService.getFromStorage()?.userID
    this.userDate=this.userService.getFromStorage()?.BirthDate
    this.userGender=this.userService.getFromStorage()?.GenderType
    this.userHMo=this.userService.getFromStorage()?.HMOType
   }

  saveUser(){
    console.log("suser",this.user)
    this.user.Children=this.children
    if(this.form.valid)
    {
      const find= this.userService.GetParent(this.user.ParentId).subscribe(
        succ=>
        {if(succ===null)
                 {    console.log("suser",this.user);
                 console.log("children",this.children)
               this.userService.PostParent(new User(0,this.user.ParentId,this.user.FirstName,this.user.LastName,this.children,this.user.GenderType,this.user.HMOType,new Date())).subscribe(
                succ=>{
                  this.children.map
                 console.log("succ",succ);
                alert("welcome");
                      this.resetForm(this.form)

                },err=>{
                 console.log("err",err)
                 });}
       else
       {console.log("ssssssssss",succ)
        alert("you are already heare");}
           },
            err=>
            {console.log("err",err)})
   }
  }

 saveChildren(){
  console.log("child",this.child)
  this.children.push(new Child(this.child.Id,this.child.ChildId,this.child.Name,this.child.BirthDate))
 // this.childServise.PostChild(this.child).subscribe(succ=>{alert("succ")},err=>{"err"})
  console.log("children",this.children)
 }
 saveName(){
  localStorage.setItem("curUser",JSON.stringify(this.user)) }

 }