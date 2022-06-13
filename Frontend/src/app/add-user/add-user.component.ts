import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import shajs from 'sha.js';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit{

  userForm !: FormGroup;
  depList = [{"name": "", "id": 0}]
  posList = [{"name": "", "id": 0}]

  constructor(private formBuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name : ['', Validators.required],
      departament : ['', Validators.required],
      position : ['', Validators.required],
      phone : ['', Validators.required],
      email : ['', Validators.compose([Validators.required, Validators.email]) ],
      password : ['', Validators.required]
    })
    this.api.getDeps().subscribe((data) => {this.depList = data; console.log(data); });
    this.api.getPositions().subscribe((data) => {this.posList = data; console.log(data); });
  }

  addUser(){
    if(this.userForm.valid){
      const hash = shajs('sha256').update(this.userForm.controls['password'].value).digest('hex')
      this.userForm.controls['password'].setValue(hash);
      console.log(this.userForm);
      this.api.postUser(this.userForm.value)
      .subscribe({
        next:(res)=>{
          alert("Added new user")
          this.userForm.reset();
        },
        error:()=>{
          alert("Something went wrong :(")
        }
      })
    }
  }
}
