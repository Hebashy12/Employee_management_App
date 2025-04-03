import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproject } from '../model/iproject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = "http://localhost:3000/project"
  constructor(private http:HttpClient) { }
  createProject(project:any){
    return this.http.post(this.apiUrl,project);
  }
  getProducts():Observable<Iproject[]>{
    return this.http.get<Iproject[]>(this.apiUrl);
  }
  editProject(project:Iproject):Observable<any>{
    return this.http.put(`${this.apiUrl}/${project.id}`,project);
  }
}
