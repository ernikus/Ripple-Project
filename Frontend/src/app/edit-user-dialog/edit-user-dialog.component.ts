import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  userForm !: FormGroup;
  depList = [{"name": "", "id": 0}]
  posList = [{"name": "", "id": 0}]

  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public userEdit: any,
    private dialogRef : MatDialogRef<EditUserDialogComponent> ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name : ['', Validators.required],
      departament : ['', Validators.required],
      position : ['', Validators.required],
      phone : ['', Validators.required],
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required]
    })
    this.api.getDeps().subscribe((data) => {this.depList = data; console.log(data); });
    this.api.getPositions().subscribe((data) => {this.posList = data; console.log(data); });

    if(this.userEdit){
      this.userForm.controls['name'].setValue(this.userEdit.name);
      this.userForm.controls['departament'].setValue(this.userEdit.departament);
      this.userForm.controls['position'].setValue(this.userEdit.position);
      this.userForm.controls['phone'].setValue(this.userEdit.phone);
      this.userForm.controls['email'].setValue(this.userEdit.email);
      this.userForm.controls['password'].setValue(this.userEdit.password);
    }
  }
  updateUser(){
    this.api.putUser(this.userForm.value, this.userEdit._id)
    .subscribe({
      next:(res)=>{
        alert("User data updated");
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Something went wrong :(")
      }
    })
  }


}
