import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { Employee } from '../../model/employee';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import {v4 as id} from 'uuid';
import { ProjectService } from '../../services/project.service';
import { Iproject } from '../../model/iproject';
import { IprojectEmployee } from '../../model/iproject-employee';
import { ProjectEmployeeService } from '../../services/project-employee.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-project',
  imports: [NgIf,NgFor,AsyncPipe,ReactiveFormsModule,FormsModule, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  @ViewChild("myModal") empModal:ElementRef|undefined;
  projectEmp:IprojectEmployee={
    id:id(),
    projectId:"",
    empId:"",
    assignedDate:"",
    role:"",
    projectName:"",
    isActive:true,
    empName:""
  }
  projectEmpList:IprojectEmployee[]=[];

  currentView="list";
  empSrv=inject(EmployeeService);
  projectSer = inject(ProjectService);
  projectEmpSer=inject(ProjectEmployeeService);
  projectForm:FormGroup=new FormGroup({});
  empObser$:Observable<Employee[]>=new Observable<Employee[]>();
  projectList:Iproject[]=[];

  constructor(){
    this.empObser$=this.empSrv.getEmployees();
    this.initForm();
  }
  onAddEmp(id:string,name:string){
    this.projectEmp.projectId=id;
    this.projectEmp.projectName=name;

    this.getEmpAssignToProj(id);
    if(this.empModal){
      this.empModal.nativeElement.style.display='block';
    }

  }
  closeModal(){
    if(this.empModal){
      this.empModal.nativeElement.style.display='none';
    }
  }
  ngOnInit(): void {
    this.getProduct();
  }
  initForm(project?:Iproject){
    this.projectForm=new FormGroup({
      id:new FormControl(project?project.id:id()),
      projectName:new FormControl(project?project.projectName:""),
      clientName:new FormControl(project?project.clientName:""),
      startDate:new FormControl(project?project.startDate:""),
      leadByEmoId:new FormControl(project?project.leadByEmoId:""),
      contactPerson:new FormControl(project?project.contactPerson:""),
      contactNo:new FormControl(project?project.contactNo:""),
      email:new FormControl(project?project.email:"")
    })
  }
  onSave(){
    const project = this.projectForm.value;
    if ((this.projectList.some(p=>p.id==project.id))){
      this.projectSer.editProject(project).subscribe((res)=>{
        alert("project Updated Successfully.");
        this.getProduct();
      },error=>{
        alert("can not response plz try again later.");
      });
  }else{


    this.projectSer.createProject(project).subscribe((res)=>{
      alert("project Created Successfully.");
      this.getProduct();
      this.initForm();
      // console.log(res);
    },error=>{
      alert("can not response plz try again later.");
    });
  }

  }
  getProduct(){
    this.projectSer.getProducts().subscribe({
      next:(project:Iproject[])=>{
        this.projectList=project;
        console.log(this.projectList);
      }
    })
  }
  edit(project:Iproject){
    this.initForm(project);
    this.currentView="form";
  }


onAddProjectEmp() {
  this.empSrv.getEmpById(this.projectEmp.empId).pipe(
    switchMap(emp => {
      this.projectEmp.empName = emp.empName;
      return this.projectEmpSer.AddNewProjectEmp(this.projectEmp);
    })
  ).subscribe(() => {
    alert("Employee Added to Project.");
    this.getEmpAssignToProj(this.projectEmp.projectId);
  }, error => {
    alert("Cannot respond, please try again later.");
  });
}

  getEmpAssignToProj(id:string){
    this.projectEmpSer.getProjectEmployees(id).subscribe({
      next:(projectEmp:IprojectEmployee[])=>{
        this.projectEmpList=projectEmp;
        console.log(this.projectEmpList);
      }
    })
  }
}
