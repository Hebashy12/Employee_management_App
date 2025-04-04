import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../services/employee.service';
import { Iproject } from '../../model/iproject';
import { ProjectEmployeeService } from '../../services/project-employee.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.getAllEmp();
    this.geProjects();
  }
  empList:Employee[]=[];
  projectList:Iproject[]=[];
  projectSer=inject(ProjectService);
  empSer=inject(EmployeeService);
  getAllEmp(){
    this.empSer.getEmployees().subscribe((emp)=>{
      this.empList=emp;
    })
  }
  geProjects(){
    this.projectSer.getProducts().subscribe((proj)=>{
      this.projectList=proj;
    })
  }
}
