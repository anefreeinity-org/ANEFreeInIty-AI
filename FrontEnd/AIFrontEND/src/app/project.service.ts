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
}