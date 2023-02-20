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

export class TwoDCoord{
  x: number;
  y: number;
}


@Injectable({
  providedIn: 'root'
})
export class CRUDRequest2Service {

  pushIteamMember: IteamContainer;

  constructor(
    private vector2D: Vector2DService
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
    //window.alert(JSON.stringify(iteamContain));
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
        window.alert("vector 2d added");
      },
      err=>{
        window.alert("vector2d cannot be added: "+err);
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
}
