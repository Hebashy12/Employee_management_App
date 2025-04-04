import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl="http://localhost:3000/employee";
  constructor(private http:HttpClient) { }
  addEmployee(user: Employee): Observable<any> {

    this.http.post("http://localhost:3000/users",{id:user.id, email:user.email, password:user.password, role:user.rol}).subscribe();
    return this.http.post(this.apiUrl, user);
  }
  editEmployee(emp: Employee): Observable<any> {
    return this.http.put(`${this.apiUrl}/${emp.id}`, emp);
  }
  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl);
  }
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getEmpById(id:string):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}/${id}`)
  }
}
