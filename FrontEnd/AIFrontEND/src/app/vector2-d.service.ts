import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {delay, Observable } from 'rxjs';
import { Vector2D, SMalVector2D, LinearCombVector2D } from './Model/Vector2D';
import { BASE_ADDRESS } from './Environment/base';

@Injectable({
  providedIn: 'root'
})
export class Vector2DService {

  link = "";

  Vector2DObs : Observable<Vector2D>;
  Vector2DList : Vector2D[];

  constructor(private http: HttpClient) { }

  getAllVector2D() : Vector2D[] {
    return this.Vector2DList;
  }

  getAllVector2DFromServer(): Observable<Vector2D[]>  {
    this.link = BASE_ADDRESS + "/api/Vector2D";
    return this.http.get<Vector2D[]>(this.link);
  }

  postVector2D(vector: Vector2D): Observable<Vector2D> {
    const headers = new HttpHeaders().set('content-type', 'application/json'); 
    const body=JSON.stringify(vector);
    window.alert(body);
    return this.http.post<Vector2D>(BASE_ADDRESS + '/api/Vector2D', vector,{headers});
  }

  deleteVector2D(deleteId: number): Observable<Vector2D> {
    this.link = BASE_ADDRESS + "/api/Vector2D/vector2DId?vector2DId=" + deleteId;
    return this.http.delete<Vector2D>(this.link);
  }

  addVector2D(vectors: Vector2D[]): Observable<Vector2D> {
    const headers = new HttpHeaders().set('content-type', 'application/json'); 
    return this.http.post<Vector2D>(BASE_ADDRESS + '/api/Vector2D/Add', vectors,{headers});
  }

  subVector2D(vectors: Vector2D[]): Observable<Vector2D> {
    const headers = new HttpHeaders().set('content-type', 'application/json'); 
    return this.http.post<Vector2D>(BASE_ADDRESS + '/api/Vector2D/Sub', vectors,{headers});
  }

  scalerMultiplicationVector2D(vectors: SMalVector2D): Observable<Vector2D> {
    const headers = new HttpHeaders().set('content-type', 'application/json'); 
    return this.http.post<Vector2D>(BASE_ADDRESS + '/api/Vector2D/sMal', vectors,{headers});
  }

  linearCombinationVector2D(data: LinearCombVector2D): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json'); 
    return this.http.post<LinearCombVector2D>(BASE_ADDRESS + '/api/Vector2D/linearCombination', data,{headers});
  }
}
