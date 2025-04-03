import { Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { LayoutComponent } from './componets/layout/layout.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { EmployeeComponent } from './componets/employee/employee.component';
import { ProjectComponent } from './componets/project/project.component';
import { ProjectEmployeeComponent } from './componets/project-employee/project-employee.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent,

  },
  {
    path:'',
    component: LayoutComponent,
    children:[
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'employee',
        component: EmployeeComponent
      },
      {
        path:'project',
        component:ProjectComponent
      },
      {
        path:'employeeProject',
        component:ProjectEmployeeComponent
      }
    ]


  }
];
