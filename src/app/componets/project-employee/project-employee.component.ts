import { Component, inject, OnInit } from '@angular/core';
import { IprojectEmployee } from '../../model/iproject-employee';
import { ProjectEmployeeService } from '../../services/project-employee.service';
import { CommonModule, DatePipe } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-project-employee',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent implements OnInit {
  projuctEmpList: IprojectEmployee[] = [];
  allProjectEmpList: IprojectEmployee[] = []; 
  empList: Employee[] = [];
  selectedEmpId: string = "";
  projectName: string = "";

  projectEmpSer = inject(ProjectEmployeeService);
  empSer = inject(EmployeeService);

  ngOnInit(): void {
    this.getProjectemp();
    this.getAllEmp();
  }

  getProjectemp() {
    this.projectEmpSer.getAllProjectEmp().subscribe({
      next: (emp) => {
        this.allProjectEmpList = emp;
        this.projuctEmpList = emp;
      }
    });
  }

  getAllEmp() {
    this.empSer.getEmployees().subscribe(emp => {
      this.empList = emp;
    });
  }

  filterResults() {
    this.projuctEmpList = this.allProjectEmpList.filter(emp => {
      const matchEmp = this.selectedEmpId === "" || emp.empId === this.selectedEmpId;
      const matchProject = this.projectName.trim() === "" || emp.projectName.toLowerCase().includes(this.projectName.toLowerCase());
      return matchEmp && matchProject;
    });
  }

  selectChange() {
    this.filterResults();
  }

  search() {
    this.filterResults();
  }
}
