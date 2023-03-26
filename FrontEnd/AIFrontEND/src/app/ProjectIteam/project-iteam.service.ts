import { ICanvasModel } from './../Model/General';
import { GlobalService } from './../services/global.service';
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
    private canvasFunctions: FunctionsService,
    private globalService: GlobalService
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

  selectedProjectIteam(vector: any, projectIteam: IteamContainer, vectorX: number, vectorY: number): boolean {
    let isTrue: boolean = true;
    if(projectIteam.ref.iteamStatus === 0){
      projectIteam.isAdded = true;
      projectIteam.ref.iteamStatus = 1;
      vectorX = Number(vector.x);
      vectorY = Number(vector.y);
      this.canvasFunctions.drawVector(vectorX, vectorY);
    } else {
      projectIteam.isAdded = false;
      projectIteam.ref.iteamStatus = 0;
      this.canvasFunctions.clearCanvas();
      this.canvasFunctions.drawAxis();
      isTrue = false;
    }
    
    return isTrue;
  }
}
