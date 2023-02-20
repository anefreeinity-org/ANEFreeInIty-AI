import { TwoDCoord } from './../Vector2D/crudrequest2.service';
import { Vector2DList1 } from './../Vector2D/CRUDRequests';
import { ProjectIteamMapper } from './../Model/ProjectIteamMapper';
import { Project } from './../Model/Project';
import { Vector2D } from './../Model/Vector2D';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Vector2DService } from '../vector2-d.service';
import { Observable } from 'rxjs';
import { iteams } from '../Model/Iteams';
import { IteamContainer } from '../Model/IteamContainer';
import { Router } from '@angular/router';
import { frames } from '../Model/referenceFrame';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
//import { CRUDVector2D } from '../Vector2D/CRUDRequests';
import { CRUDRequest2Service } from '../Vector2D/crudrequest2.service';
import { CRUDVector2D } from '../Vector2D/CRUDRequests';
import { FunctionsService } from '../CanvasFunctions/functions.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit{

 // vall: number = val;

  canvasWidth = 1199;
  canvasHeight = 674;
  span = 20;

  xQuandinateTolarance: number = 0;
  yQuandinateTolarance: number = 0;
  tolarance: TwoDCoord;

  vectorX: number = 0;
  vectorY: number = 0;
  vectorPos: TwoDCoord;

  startingQuadinateX: number = 0;
  startingQuadinateY: number = 0;
  startingCoord: TwoDCoord;

  coordinateX: number;
  coordinateY: number;

  myCanvas: any;
  context: any;

  Vector2DObs : Observable<Vector2D[]>;
  Vector2DList : Vector2D[];
  vector2DCRUDService: CRUDRequest2Service;

  iteamMenue: string[] = iteams;
  iteamSelectedMenue: string = "Vector2D";
  iteamContain: IteamContainer[] = [];
  ishoveringOnIteam: boolean = false;

  referenceFrameList: string[] = frames;
  selectedFrame: string = this.referenceFrameList[0];

  formDetails = this.formBuilder.group({
    vector2D_coord: ["", Validators.required],
    vector2D_name: ["", Validators.required],
    vector2D_description: ["", Validators.required],
  });

  projectList: Project[] = [];
  selectedProjectRef: Project = new Project();
  selectedProject: Project;
  projectIteamContainer: IteamContainer[] = [];

  //vr: CRUDVector2D;

  constructor(
    @Inject(DOCUMENT) document: Document,
    protected vector2D: Vector2DService,
    protected router: Router,
    private formBuilder: FormBuilder,
    private project: ProjectService,
    private vector2DFunctions: CRUDRequest2Service,
    private canvasFunctions: FunctionsService
    ) {this.vector2DCRUDService = this.vector2DFunctions; }

  ngOnInit(): void {
    this.myCanvas = document.getElementById("canvas");
    this.canvasWidth = this.myCanvas.clientWidth;
    this.canvasHeight = this.myCanvas.clientHeight;
    this.context = this.myCanvas.getContext("2d");

    //this.drawAxis();

    this.tolarance = this.canvasFunctions.drawAxis(this.context, this.span, this.canvasHeight, this.canvasWidth, this.xQuandinateTolarance, this.yQuandinateTolarance);
    this.xQuandinateTolarance = this.tolarance.x;
    this.yQuandinateTolarance = this.tolarance.y;
    this.getVector2D();
    this.getProjects();
    //this.getVector2D2();
    //this.func();
  }

  getProjects(): void {
    this.project.getAllProjectsFromServer().subscribe(
      res=>{
        this.projectList = res;
        //window.alert(JSON.stringify(this.projectList));
        this.addToProjectIteamContainer(this.projectList[0]);
        //this.vr.addToProjectIteamContainer(this.projectList[0], this.projectIteamContainer)
      },
      err=>{
        window.alert("cannot get projects: "+JSON.stringify(err));
      }
    );
  }

  getVector2D() : void {
    this.Vector2DObs = this.vector2D.getAllVector2DFromServer();
    this.Vector2DObs.subscribe(
      res=>{
        this.Vector2DList = res;
        //this.drawVector2D();
        
        this.drawListOf2DPoints(this.vector2DFunctions.getListOf2DPointsForVector2D(this.iteamContain));
        //this.vector2DMethod();
        this.vector2DFunctions.vector2DListToHTMLElementContainer(this.Vector2DList, this.iteamContain);
      },
      err=>{
        window.alert("error cannot get vector2D: " + err);
      }
    );
  }

  // getVector2D2() {
    
  //   let d: Vector2D[] = [];
  //   this.vr.getVector2D1().then(
  //     data=>{
  //       d = data;
  //       window.alert(JSON.stringify(data));
  //     }
  //   );
    
  // }

  // drawVector2D() : void {
  //   for(let v of this.iteamContain){
  //     if(v.isAdded){
  //       this.vectorX = Number(v.ref.x);
  //       this.vectorY = Number(v.ref.y);
  //       //this.drawVector();
  //       this.canvasFunctions.drawVector(this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.vectorX, this.vectorY, this.startingQuadinateX, this.startingQuadinateY);
  //     }
  //   }
  // }

  drawListOf2DPoints(points2D: TwoDCoord[]): void {
    //window.alert(JSON.stringify(points2D));
    for(let p of points2D){
      this.vectorX = p.x;
      this.vectorY = p.y;
      this.canvasFunctions.drawVector(this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.vectorX, this.vectorY, this.startingQuadinateX, this.startingQuadinateY);
      //this.drawVector();
    }
  }

  // drawProject(project: Project): void {
  //   for(let v of project.projectMapper){
  //     if(v.iteamStatus){
  //       this.vectorX = Number(v.ref.x);
  //       this.vectorY = Number(v.ref.y);
  //       this.drawVector();
  //     }
  //   }
  // }

//   drawAxis(){
//     this.context.beginPath();
//     this.context.strokeStyle = 'rgba(' + [40, 40, 40, 0.3] + ')';

//     for(var x = this.span; x < this.canvasHeight; x+=this.span){
//       this.context.moveTo(0,x);
//       this.context.lineTo(this.canvasWidth,x);
//       this.context.stroke();
//     }

//     for(var x = this.span; x < this.canvasWidth; x+=this.span){
//       this.context.moveTo(x,0);
//       this.context.lineTo(x,this.canvasWidth);
//       this.context.stroke();
//     }

//     this.context.beginPath();
//     this.context.strokeStyle = 'rgba(' + [255, 0, 13, 1] + ')';

//     var horizontalLine = this.span*Math.floor(Math.floor(this.canvasHeight/this.span)/2);
//     var verticalLine = this.span*Math.floor(Math.floor(this.canvasWidth/this.span)/2);

//     this.xQuandinateTolarance = verticalLine;
//     this.yQuandinateTolarance = horizontalLine;

//     this.context.moveTo(verticalLine,0);
//     this.context.lineTo(verticalLine,this.canvasHeight);
//     this.context.stroke();

//     this.context.moveTo(0,horizontalLine);
//     this.context.lineTo(this.canvasWidth,horizontalLine);
//     this.context.stroke();
// }

displayIteamValues(): void {
  switch(this.iteamSelectedMenue){
    case "Vector2D" : //this.vector2DMethod();
    this.vector2DFunctions.vector2DListToHTMLElementContainer(this.Vector2DList, this.iteamContain);
                      break;
    
    case "Vector3D" : window.alert("Vector3D is under development");
                      break;

    case "Matrix" : window.alert("Matrix is under development");
                      break;

    default: window.alert("something went wrong");
  }
}

// displayAllProjects(): void {
//   //window.alert(JSON.stringify(this.selectedProject));
// }

selectedProjectFunction(proj: Project): void {
  this.selectedProject = proj;
  //window.alert(this.selectedProject.name);
  this.projectIteamContainer = [];
  this.addToProjectIteamContainer(this.selectedProject);
}

frameChange(): void {
  if(this.selectedFrame === "Cartesian Frame"){
    
  } else {
    window.alert("under development");
  }
}

// vector2DMethod(): void {
//   let pushIteamMember: IteamContainer;
  
//   for(let v of this.Vector2DList){
//     pushIteamMember = new IteamContainer();
//     pushIteamMember.id = Number(v.id);
//     pushIteamMember.name = v.name;
//     pushIteamMember.ref = v;

//     this.iteamContain.push(pushIteamMember);
//   }
// }

addToProjectIteamContainer(project: Project): void {
  let pushIteamMember: IteamContainer;
  
  for(let v of project.projectMapper){
    pushIteamMember = new IteamContainer();
    pushIteamMember.id = Number(v.id);
    pushIteamMember.name = v.vector2DName;
    pushIteamMember.isAdded = v.iteamStatus === 1? true: false;
    pushIteamMember.ref = v;

    this.projectIteamContainer.push(pushIteamMember);
  }
}

selectedIteam(iteam: IteamContainer, event: any): void {
  event.preventDefault();
  const vector: Vector2D = iteam.ref;
  if(!iteam.isAdded){
    iteam.isAdded = true;
    this.vectorX = Number(vector.x);
    this.vectorY = Number(vector.y);
    //this.drawVector();
    this.canvasFunctions.drawVector(this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.vectorX, this.vectorY, this.startingQuadinateX, this.startingQuadinateY);
  } else {
    iteam.isAdded = false;
    this.canvasFunctions.clearCanvas(this.context, this.canvasWidth, this.canvasHeight);
    //this.clearCanvas();
    //this.drawAxis();
    this.tolarance = this.canvasFunctions.drawAxis(this.context, this.span, this.canvasHeight, this.canvasWidth, this.xQuandinateTolarance, this.yQuandinateTolarance);
    this.xQuandinateTolarance = this.tolarance.x;
    this.yQuandinateTolarance = this.tolarance.y;
    //this.drawVector2D();
    this.drawListOf2DPoints(this.vector2DFunctions.getListOf2DPointsForVector2D(this.iteamContain));
  }
}

// func(){
//     this.context.beginPath();
//     this.context.moveTo(20, 20);
//     this.context.lineTo(20, 100);
//     //canvas_ctx.lineTo(70, 100);
//     this.context.strokeStyle = "red";
//     this.context.stroke();
// }

showCoords(event: any) {
    let x = event.clientX;
    let y = event.clientY;
    this.coordinateX = x - 596;
    this.coordinateY = (y - 338)*-1;
}

onSubmit(): void {
  if(this.iteamSelectedMenue === "Vector2D"){
    //this.addVector();
    this.vectorPos = this.vector2DFunctions.addVector(this.selectedFrame, this.formDetails, this.vectorX, this.vectorY);
    this.vectorX = this.vectorPos.x;
    this.vectorY = this.vectorPos.y;
    this.canvasFunctions.drawVector(this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.vectorX, this.vectorY, this.startingQuadinateX, this.startingQuadinateY);
  }
}

// addVector(): void {

//   if(this.selectedFrame === "Polar Frame"){
//     window.alert("unable to add polar frame of reference is under development");
//     return;
//   }

//   let value = this.formDetails.get("vector2D_coord")?.value;
//   let quadinates: string[] = value.split(',');
//   this.vectorX = Number(quadinates[0]);
//   this.vectorY = Number(quadinates[1]);

//   let newVector: Vector2D = new Vector2D();
//   newVector.x = this.vectorX;
//   newVector.y = this.vectorY;
//   newVector.name = this.formDetails.get("vector2D_name")?.value;
//   newVector.description = this.formDetails.get("vector2D_description")?.value;

//   this.vector2D.postVector2D(newVector).subscribe(
//     res=>{
//       window.alert("vector 2d added");
//       //this.getVector2D();
//     },
//     err=>{
//       window.alert("vector2d cannot be added: "+err);
//     }
//   );

//   //window.alert(this.vectorX+", "+this.vectorY);
//   //this.drawVector();
//   this.canvasFunctions.drawVector(this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.vectorX, this.vectorY, this.startingQuadinateX, this.startingQuadinateY);
// }

// deleteThisVector(vector: IteamContainer): void {
//   this.vector2D.deleteVector2D(vector.ref.id).subscribe(
//     res=>{
//       window.alert("unable to delete: "+res);
//     },
//     err=>{
//       window.alert("sucessfully deleted iteam: "+err.id);
//       //const indx = this.iteamContain.indexOf(vector);
//       //window.alert(indx);

//     }
//   );
// }

hoverOnIteam(onHovering: boolean, iteam: IteamContainer): void {
  iteam.isHovering = onHovering;
  //window.alert(this.ishoveringOnIteam);
}

hoverOnProjectIteam(onHovering: boolean, iteam: IteamContainer): void {
  iteam.isHovering = onHovering;
  //window.alert(this.ishoveringOnIteam);
}

// drawVector(): void {
//   this.canvasFunctions.drawVector(this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.vectorX, this.vectorY, this.startingQuadinateX, this.startingQuadinateY)
//   // let spX = this.startingQuadinateX+this.xQuandinateTolarance;
//   // let spY = this.yQuandinateTolarance - this.startingQuadinateY;
//   // let epX = spX+this.vectorX;
//   // let epY = spY-this.vectorY;

//   // this.context.beginPath();
//   // this.context.strokeStyle = 'rgba(' + [0, 239, 255, 1] + ')';
//   // this.context.moveTo(spX,spY);
//   // this.context.lineTo(epX,epY);
//   // this.drawArrow(spX, spY, epX, epY);
//   // this.context.stroke();
// }

// clearCanvas(): void {
//   this.canvasFunctions.clearCanvas(this.context, this.canvasWidth, this.canvasHeight);
//   //this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
// }

// drawArrow(fromx: number, fromy: number, tox: number, toy: number): void {
//   var headlen = 10;
//   var dx = tox - fromx;
//   var dy = toy - fromy;
//   var angle = Math.atan2(dy, dx);
//   this.context.moveTo(fromx, fromy);
//   this.context.lineTo(tox, toy);
//   this.context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
//   this.context.moveTo(tox, toy);
//   this.context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
// }

getStartingQuadinates(): void {
  this.startingCoord = this.canvasFunctions.getStartingQuadinates(document, this.startingQuadinateX, this.startingQuadinateY)
  // let value = (<HTMLInputElement>document.getElementById("starting-quad-data")).value;
  // let quadinates: string[] = value.split(',');
  // this.startingQuadinateX = Number(quadinates[0]);
  // this.startingQuadinateY = Number(quadinates[1]);
  this.startingQuadinateX = this.startingCoord.x;
  this.startingQuadinateY = this.startingCoord.y;

  this.getVector2D();
  //window.alert(this.startingQuadinateX+", "+this.startingQuadinateY);
}

// tracked(item: any, index: any){
//   return index;
// }
}
