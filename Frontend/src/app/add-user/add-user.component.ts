import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit{

  userForm !: FormGroup;
  depList = ["Web Departament", "HR", "SOC", "Other"];
  posList = ["Junior Level", "Mid Level", "Senior Level", "Other", "test"]

  constructor(private formBuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name : ['', Validators.required],
      departament : ['', Validators.required],
      position : ['', Validators.required],
      phone : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  addUser(){
    if(this.userForm.valid){
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
