import { ICoordinate2D } from './../Model/Coordinates';
import { FunctionsService } from './../CanvasFunctions/functions.service';
import { HomePageComponent } from './../home-page/home-page.component';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Vector2DService } from '../vector2-d.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Observable, delay } from 'rxjs';
import { Vector2D } from '../Model/Vector2D';
import { Project } from '../Model/Project';
import { IteamContainer } from '../Model/IteamContainer';
import { of } from 'rxjs';

export class TwoDCoord{
  x: number;
  y: number;
  isTrue: boolean = true;
}


@Injectable({
  providedIn: 'root'
})
export class CRUDRequest2Service {

  pushIteamMember: IteamContainer;

  constructor(
    private vector2D: Vector2DService,
    private vectorService: Vector2DService,
    private canvasFunctionService: FunctionsService
    ){}

  vector2DListToHTMLElementContainer(Vector2DList: Vector2D[], iteamContain: IteamContainer[]): void {
    let pushIteamMember: IteamContainer;
    
    for(let v of Vector2DList){
      pushIteamMember = new IteamContainer();
      pushIteamMember.id = Number(v.id);
      pushIteamMember.name = v.name;
      pushIteamMember.ref = v;
  
      iteamContain.push(pushIteamMember);
    }
  }

  getListOf2DPointsForVector2D(iteamContain: IteamContainer[]) : TwoDCoord[] {
    let coords: TwoDCoord[] = [];
    let iteam: TwoDCoord;
    for(let v of iteamContain){
      if(v.isAdded){
        iteam = new TwoDCoord();
        iteam.x = v.ref.x;
        iteam.y = v.ref.y;
        coords.push(iteam);
      }
    }
    return coords;
  }

  getListOf2DPointsForVector2DProject(iteamContain: IteamContainer[], vectors: Vector2D[]) : TwoDCoord[] {
    let coords: TwoDCoord[] = [];
    let iteam: TwoDCoord;
    for(let v of iteamContain){
      if(v.ref.iteamStatus === 1){
        iteam = new TwoDCoord();
        let vector: any = vectors.find(vect => vect.id == v.ref.vector2DId);
        iteam.x = vector.x;
        iteam.y = vector.y;
        coords.push(iteam);
      }
    }
    return coords;
  }

  addVector(selectedFrame: string, formDetails: FormGroup, vectorX: number, vectorY: number): TwoDCoord {
    let vectorPos = new TwoDCoord();

    if(selectedFrame === "Polar Frame"){
      window.alert("unable to add polar frame of reference is under development");
    } else {
      let value = formDetails.get("vector2D_coord")?.value;
    let quadinates: string[] = value.split(',');
    vectorX = Number(quadinates[0]);
    vectorY = Number(quadinates[1]);
  
    let newVector: Vector2D = new Vector2D();
    newVector.x = vectorX;
    newVector.y = vectorY;
    newVector.name = formDetails.get("vector2D_name")?.value;
    newVector.description = formDetails.get("vector2D_description")?.value;
  
    this.vector2D.postVector2D(newVector).subscribe(
      res=>{
        window.alert("vector 2d is posted");
      },
      err=>{
        window.alert("vector2d cannot be posted: "+err);
      }
    );
    } 

    vectorPos.x = vectorX;
    vectorPos.y = vectorY;
    return vectorPos;
  }

  deleteThisVector(vector: IteamContainer): void {
    window.alert("delete");
    this.vector2D.deleteVector2D(vector.ref.id).subscribe(
      res=>{
        window.alert("unable to delete: "+res);
      },
      err=>{
        window.alert("sucessfully deleted iteam: "+err.id);
        //const indx = this.iteamContain.indexOf(vector);
        //window.alert(indx);
  
      }
    );
  }

  addVectors2D(data: string) {
    let vectors: Vector2D[] = [];
    let addedVector: ICoordinate2D = <ICoordinate2D>{};
    let coords: ICoordinate2D[] = [];
    let vectorBuffer = data.split(';');

    for(let vector of vectorBuffer) {
      let vectorData: Vector2D = new Vector2D();
      let coord: ICoordinate2D = <ICoordinate2D>{};
      vector = vector.substring(1, vector.length-1);
      let buffer = vector.split(',');
      vectorData.x = Number(buffer[0]);
      vectorData.y = Number(buffer[1]);
      coord.x = Number(buffer[0]);
      coord.y = Number(buffer[1]);
      coord.color = '#35baf2';
      vectors.push(vectorData);
      coords.push(coord);
    }
    
    this.vectorService.addVector2D(vectors).subscribe(
      res => {
        addedVector.x = res.x!;
        addedVector.y = res.y!;
        addedVector.color = '#fc32d1';
        coords.push(addedVector);
        this.canvasFunctionService.drawListOf2DCoordinates(coords);
      },
      err => {
        window.alert("cannot add vector");
      }
    );
  }
}
//[-70,-80];[80,-70];[100,200];[-98,-8]
//[100,0];[0,100]