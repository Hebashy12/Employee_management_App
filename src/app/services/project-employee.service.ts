import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IprojectEmployee } from '../model/iproject-employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectEmployeeService {
  private apiUrl = "http://localhost:3000/projectEmployee";
  constructor(private http:HttpClient) { }
  AddNewProjectEmp(projectEmp:IprojectEmployee){
    return this.http.post(this.apiUrl,projectEmp);
  }
  getProjectEmployees(projectId: string): Observable<IprojectEmployee[]> {
    return this.http.get<IprojectEmployee[]>(`${this.apiUrl}?projectId=${projectId}`);
  }
  getAllProjectEmp():Observable<IprojectEmployee[]>{
    return this.http.get<IprojectEmployee[]>(this.apiUrl);
  }
}
