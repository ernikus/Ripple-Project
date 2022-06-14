import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'departament', 'position', 'edit'];
  dataSource!: MatTableDataSource<any>;
  department: Map<number, string> = new Map<number,string>();
  position: Map<number, string> = new Map<number, string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getPositions();
    this.getUsers();
  }
  
  getDepartments(){
    this.api.getDeps().subscribe((data) => {
       data.forEach((element: any) => {
         this.department.set(element["id"], element["name"]);
       })
    });
  }
  
  getPositions(){
    this.api.getPositions().subscribe((data) => {
       data.forEach((element: any) => {
         this.position.set(element["id"], element["name"]);
       })
    });
  }
  
  getUsers(){
    this.api.getAllUsers()
    .subscribe({
      next:(res)=>{
        res = res.filter((item: any) => item["isDeleted"] !== true);
        res.forEach((element: any) => {
           element["departament"] = this.department.get(element["depID"]);
        });
        res.forEach((element: any) => {
           element["position"] = this.position.get(element["posID"]);
        });
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        alert("Something went wrong :(")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  editUser(row : any){
    this.dialog.open(EditUserDialogComponent, {
      width:'30%',
      data: row
    });
  }
  
  deleteUser(id : number){
    this.api.delUser(id)
    .subscribe({
      next:(res)=>{
        alert("Deleted user")
      },
      error:()=>{
        alert("Something went wrong :(")
      }
    })
  }
}

