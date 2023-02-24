import { Vector2D } from './../Model/Vector2D';
import { IteamContainer } from './../Model/IteamContainer';
import { Injectable } from '@angular/core';
import { Project } from '../Model/Project';
import { CRUDRequest2Service, TwoDCoord } from '../Vector2D/crudrequest2.service';
import { FunctionsService } from '../CanvasFunctions/functions.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectIteamService {

  constructor(
    private vector2DFunctions: CRUDRequest2Service,
    private canvasFunctions: FunctionsService
  ) { }

  addToProjectIteamContainer(project: Project, projectIteamContainer: IteamContainer[]): void {
    let pushIteamMember: IteamContainer;
    
    for(let v of project.projectMapper){
      pushIteamMember = new IteamContainer();
      pushIteamMember.id = Number(v.id);
      pushIteamMember.name = v.vector2DName;
      pushIteamMember.isAdded = v.iteamStatus === 1? true: false;
      pushIteamMember.ref = v;
  
      projectIteamContainer.push(pushIteamMember);
    }
  }

  selectedProjectIteam(vector: any, projectIteam: IteamContainer, vectorX: number, vectorY: number, context: any, xQuandinateTolarance: number, yQuandinateTolarance: number, startingQuadinateX: number, startingQuadinateY: number, canvasWidth: number, canvasHeight: number, span: number): TwoDCoord {
    //const vectorId: number = projectIteam.ref.vector2DId;
    //const vector: Vector2D = projectIteam.ref;
    let retVal = new TwoDCoord();
    //window.alert(projectIteam.ref.iteamStatus);
    if(projectIteam.ref.iteamStatus === 0){
      projectIteam.isAdded = true;
      projectIteam.ref.iteamStatus = 1;
      vectorX = Number(vector.x);
      vectorY = Number(vector.y);
      //window.alert("o");
      this.canvasFunctions.drawVector(context, xQuandinateTolarance, yQuandinateTolarance, vectorX, vectorY, startingQuadinateX, startingQuadinateY);
      //window.alert("k");
    } else {
      projectIteam.isAdded = false;
      projectIteam.ref.iteamStatus = 0;
      this.canvasFunctions.clearCanvas(context, canvasWidth, canvasHeight);
      let tolarance = this.canvasFunctions.drawAxis(context, span, canvasHeight, canvasWidth, xQuandinateTolarance, yQuandinateTolarance);
      xQuandinateTolarance = tolarance.x;
      yQuandinateTolarance = tolarance.y;
      retVal.isTrue = false;
    }

    retVal.x = xQuandinateTolarance;
    retVal.y = yQuandinateTolarance;
    return retVal;
  }
}
