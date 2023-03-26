import { ProjectIteamMapper } from './../Model/ProjectIteamMapper';
import { Project } from './../Model/Project';
import { CRUDRequest2Service, TwoDCoord } from './../Vector2D/crudrequest2.service';
import { Vector2D } from './../Model/Vector2D';
import { Injectable } from '@angular/core';
import { IteamContainer } from '../Model/IteamContainer';
//import { FunctionsService } from '../functions.service';
import { FunctionsService } from '../CanvasFunctions/functions.service';


@Injectable({
  providedIn: 'root'
})
export class IteamService {

  constructor(
    private vector2DFunctions: CRUDRequest2Service,
    private canvasFunctions: FunctionsService
  ) { }

  displayIteamValues(iteamSelectedMenue: string, Vector2DList: Vector2D[], iteamContain: IteamContainer[]): void {
    switch(iteamSelectedMenue){
      case "Vector2D" : //this.vector2DMethod();
      this.vector2DFunctions.vector2DListToHTMLElementContainer(Vector2DList, iteamContain);
                        break;
      
      case "Vector3D" : window.alert("Vector3D is under development");
                        break;
  
      case "Matrix" : window.alert("Matrix is under development");
                        break;
  
      default: window.alert("something went wrong");
    }
  }

  selectedIteam(selectedProject: Project, projectIteamContainer: IteamContainer[], iteam: IteamContainer, vectorX: number, vectorY: number) {
    let addVector: ProjectIteamMapper = new ProjectIteamMapper();
    addVector.projectId = selectedProject.id;
    addVector.vector2DId = iteam.ref.id;
    addVector.vector2DName = iteam.ref.name;
    addVector.iteamStatus = 1;

    let newProjectIteam: IteamContainer = new IteamContainer();
    newProjectIteam.name = addVector.vector2DName;
    newProjectIteam.isAdded = true;
    newProjectIteam.ref = addVector;

    projectIteamContainer.push(newProjectIteam);

    const vector: Vector2D = iteam.ref;
    vectorX = Number(vector.x);
    vectorY = Number(vector.y);
    this.canvasFunctions.drawVector(vectorX, vectorY);
    //let retVal = new TwoDCoord();
    // if(!iteam.isAdded){
    //   iteam.isAdded = true;
    //   vectorX = Number(vector.x);
    //   vectorY = Number(vector.y);
      
    //   //this.drawVector();
    //   this.canvasFunctions.drawVector(context, xQuandinateTolarance, yQuandinateTolarance, vectorX, vectorY, startingQuadinateX, startingQuadinateY);
    // } else {
    //   iteam.isAdded = false;
    //   this.canvasFunctions.clearCanvas(context, canvasWidth, canvasHeight);
    //   //this.clearCanvas();
    //   //this.drawAxis();
    //   let tolarance = this.canvasFunctions.drawAxis(context, span, canvasHeight, canvasWidth, xQuandinateTolarance, yQuandinateTolarance);
    //   xQuandinateTolarance = tolarance.x;
    //   yQuandinateTolarance = tolarance.y;
    //   //this.drawVector2D();
    //   retVal.isTrue = false;
    //   //this.drawListOf2DPoints(this.vector2DFunctions.getListOf2DPointsForVector2D(this.iteamContain));
    // }

    // retVal.x = xQuandinateTolarance;
    // retVal.y = yQuandinateTolarance;
    // return retVal;
  }

  hoverOnIteam(onHovering: boolean, iteam: IteamContainer): void {
    iteam.isHovering = onHovering;
  }
}
