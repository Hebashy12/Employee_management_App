import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Idepartment } from '../model/idepartment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }
  getDept():Observable<Idepartment[]>{
    return this.http.get<Idepartment[]>("http://localhost:3000/department");
  }
}
