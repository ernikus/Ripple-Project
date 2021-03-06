import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postUser(data : any){
    return this.http.post<any>("http://localhost:50000/add-employee/", data);
  }
  getAllUsers(){
    return this.http.get<any>("http://localhost:50000/employees/")
  }
  putUser(data : any, id : number){
    return this.http.put<any>("http://localhost:50000/edit-employee/"+id, data)
  }
  delUser(id : number){
    return this.http.delete<any>("http://localhost:50000/delete-employee/"+id)
  }
  getDeps(){
    return this.http.get<any>("http://localhost:50000/departments");
  }
  getPositions(){
    return this.http.get<any>("http://localhost:50000/positions");
  }
}
