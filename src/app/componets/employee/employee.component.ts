import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Idepartment } from '../../model/idepartment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee} from '../../model/employee';
import { EmployeeService } from '../../services/employee.service';
import {v4 as id} from 'uuid';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  deptId:number=0;
  masterService=inject(MasterService);
  deptList:Idepartment[]=[];
  employeeObj:Employee=new Employee();
  empService=inject(EmployeeService);
  empList:Employee[]=[];
  isOpened=signal<boolean>(false)
  ngOnInit(): void {
    this.getDeptList();
    this.getEmpList();
  }
  getDeptList():void{
    // debugger;
    this.masterService.getDept().subscribe({
        next:(deprtment)=>{
          console.log("Departments Data: ", deprtment);
              this.deptList = deprtment;
            }
          })
  }

  onSaveEmp(){
    this.employeeObj.id=id();
    this.empService.addEmployee(this.employeeObj).subscribe(response=>{
      alert("Employee Saved Successfully.");
      this.employeeObj=new Employee();
      this.getEmpList();
    },error=>{
      alert("You have an error now")
    })
  }

  getEmpList():void{
    this.empService.getEmployees().subscribe({
        next:(emp)=>{
          console.log("Employee Data: ", emp);
              this.empList = emp;
            }
          })
  }
  delete(id:string){
    const confirmed = confirm("Are you Sure want to Delete this Employee?");
    if(confirmed){
      this.empService.deleteEmployee(id).subscribe(res=>{
        alert("Employee Deleted Successfully.");
        this.getEmpList();
      },error=>{
        alert("You have some errors plz solve it and try again.");
      })
    }
  }
  edit(emp:Employee){
    this.employeeObj=emp;
    this.isOpened.set(true)
  }
  onUpdateEmp(){
    this.empService.editEmployee(this.employeeObj).subscribe(response=>{
      alert("Employee Updated Successfully.");
      this.employeeObj=new Employee();
      this.getEmpList();
    },error=>{
      alert("You have an error now")
    })
  }
  addNew(){
    this.isOpened.set(true);
  }
  close(){
    this.isOpened.set(false);
  }
}
















