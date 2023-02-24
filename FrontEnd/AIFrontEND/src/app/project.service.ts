import { Project } from './Model/Project';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {delay, Observable } from 'rxjs';
import { BASE_ADDRESS } from './Environment/base';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  link: string = "";
  constructor(private http: HttpClient) { }

  getAllProjectsFromServer(): Observable<Project[]>  {
    this.link = BASE_ADDRESS + "/api/Project";
    return this.http.get<Project[]>(this.link);
  }

  updateProject(pID: number, project: Project): Observable<Project> {
    const headers = new HttpHeaders().set('content-type', 'application/json'); 
    const body=JSON.stringify(project);
    window.alert(body);
    return this.http.put<Project>(BASE_ADDRESS + `/api/Project/${pID}`, project,{headers});
  }
}