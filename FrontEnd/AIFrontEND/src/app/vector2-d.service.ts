import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {delay, Observable } from 'rxjs';
import { Vector2D } from './Model/Vector2D';
import { BASE_ADDRESS } from './Environment/base';

@Injectable({
  providedIn: 'root'
})
export class Vector2DService {

  getLink = "";

  Vector2DObs : Observable<Vector2D>;
  Vector2DList : Vector2D[];

  constructor(private http: HttpClient) { }

  getAllVector2D() : Vector2D[] {
    return this.Vector2DList;
  }

  getAllVector2DFromServer(): Observable<Vector2D[]>  {
    this.getLink = BASE_ADDRESS + "/api/Vector2D";
    return this.http.get<Vector2D[]>(this.getLink);
  }
}
