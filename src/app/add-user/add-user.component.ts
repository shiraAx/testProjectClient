import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import Child from 'src/Models/Child';
import { Gender } from 'src/Models/Gender';
import { HMO } from 'src/Models/HMO';
import User from 'src/Models/User';
import { UserService } from 'src/Services/user.service';
import { FormsModule, Validators } from '@angular/forms';
import { ChildService } from 'src/Services/child.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FloatLabelType } from '@angular/material/form-field';
import * as XLSX from 'xlsx';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  data = [];
  genderArr = Gender;
  hmoArr = HMO;
  @ViewChild('myForm') form: any;
  constructor(
    public userService: UserService,
    public childServise: ChildService
  ) {}

  resetForm(myForm: NgForm) {
    if (myForm != null) myForm.resetForm();
  }
  ngOnInit(): void {}
  saveUser() {
    if (
      this.checkCorrectDate(this.userService.user.BirthDate, new Date()) ===
      true
    ) {
      console.log('suser', this.userService.user);
      this.userService.user.Children = this.userService.children;
      if (this.form.valid) {
        console.log('uuuuu', this.userService.user);
        const find = this.userService
          .GetParent(this.userService.user.ParentId)
          .subscribe(
            (succ) => {
              if (succ === null) {
                console.log('suser', this.userService.user.GenderType);
                console.log('children', this.userService.children);
                this.userService
                  .PostParent(
                    new User(
                      0,
                      this.userService.user.ParentId,
                      this.userService.user.FirstName,
                      this.userService.user.LastName,
                      this.userService.children,
                      this.userService.user.GenderType,
                      this.userService.user.HMOType,
                      new Date()
                    )
                  )
                  .subscribe(
                    (succ) => {
                      this.userService.children.map;
                      console.log('succ', succ);
                      alert('ברוך הבא');
                      this.data.push(
                        new User(
                          0,
                          this.userService.user.ParentId,
                          this.userService.user.FirstName,
                          this.userService.user.LastName,
                          this.userService.children,
                          this.userService.user.GenderType,
                          this.userService.user.HMOType,
                          new Date()
                        )
                      );
                      this.userService.children.map((item) =>
                        this.data.push(
                          new Child(
                            item.Id,
                            item.ChildId,
                            item.Name,
                            item.BirthDate
                          )
                        )
                      );
                      this.exportexcel(
                        this.data,
                        this.userService.user.FirstName
                      );
                      this.userService.children=[]
                      this.data = [];
                      this.resetForm(this.form);
                    },
                    (err) => {
                      console.log('err', err);
                    }
                  );
              } else {
                console.log('ssssssssss', succ);
                //   this.userService.PostParent(new User(0,this.user.ParentId,this.user.FirstName,this.user.LastName,this.children,this.user.GenderType,this.user.HMOType,new Date()))
                alert('אתה כבר רשום למערכת');
                this.resetForm(this.form);
              }
            },
            (err) => {
              console.log('err', err);
            }
          );
      }
    }
  }
  saveChildren() {
    if (
      this.checkCorrectDate(
        this.userService.child.BirthDate,
        this.userService.user.BirthDate
      ) === true
    ) {
      console.log('child', this.userService.child);
      this.userService.children.push(
        new Child(
          this.userService.child.Id,
          this.userService.child.ChildId,
          this.userService.child.Name,
          this.userService.child.BirthDate
        )
      );
      // this.childServise.PostChild(this.child).subscribe(succ=>{alert("succ")},err=>{"err"})
      console.log('children', this.userService.children);
    }
  }
  checkCorrectDate(d1: any, d2: any) {
    if (d1 > d2) {
      alert('תאריך שגוי');
      return false;
    }
    return true;
  }
  exportexcel(json: any[], fileName: string): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName + '.xlsx');
  }
}
