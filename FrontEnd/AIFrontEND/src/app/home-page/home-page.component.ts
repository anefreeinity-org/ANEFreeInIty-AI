import { ProjectIteamService } from './../ProjectIteam/project-iteam.service';
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
import { CRUDRequest2Service } from '../Vector2D/crudrequest2.service';
import { CRUDVector2D } from '../Vector2D/CRUDRequests';
import { FunctionsService } from '../CanvasFunctions/functions.service';
import { IteamService } from '../Iteam/iteam.service';
import { ProjectOperationService } from '../ProjectOperation/project-operation.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {

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

  Vector2DObs: Observable<Vector2D[]>;
  Vector2DList: Vector2D[];
  vector2DCRUDService: CRUDRequest2Service;

  iteamMenue: string[] = iteams;
  iteamSelectedMenue: string = "Vector2D";
  iteamContain: IteamContainer[] = [];
  ishoveringOnIteam: boolean = false;
  iteamHtml: IteamService;

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
  saveProject: ProjectOperationService;

  constructor(
    @Inject(DOCUMENT) document: Document,
    protected vector2D: Vector2DService,
    protected router: Router,
    private formBuilder: FormBuilder,
    private project: ProjectService,
    private vector2DFunctions: CRUDRequest2Service,
    private canvasFunctions: FunctionsService,
    private iteamService: IteamService,
    private projectIteamService: ProjectIteamService,
    private projectOperationService: ProjectOperationService
  ) {
    this.vector2DCRUDService = this.vector2DFunctions;
    this.iteamHtml = iteamService;
    this.saveProject = projectOperationService;
  }

  ngOnInit(): void {
    this.myCanvas = document.getElementById("canvas");
    this.canvasWidth = this.myCanvas.clientWidth;
    this.canvasHeight = this.myCanvas.clientHeight;
    this.context = this.myCanvas.getContext("2d");

    this.tolarance = this.canvasFunctions.drawAxis(this.context, this.span, this.canvasHeight, this.canvasWidth, this.xQuandinateTolarance, this.yQuandinateTolarance);
    this.xQuandinateTolarance = this.tolarance.x;
    this.yQuandinateTolarance = this.tolarance.y;
    this.getVector2D();
    this.getProjects();
  }


  //-------------------------------------------Project--------------------------------------------------

  getProjects(): void {
    this.project.getAllProjectsFromServer().subscribe(
      res => {
        this.projectList = res;
        this.selectedProject = this.projectList[0];
        this.addToProjectIteamContainer(this.projectList[0]);
        this.drawListOf2DPoints(this.vector2DFunctions.getListOf2DPointsForVector2DProject(this.projectIteamContainer, this.Vector2DList));
      },
      err => {
        window.alert("cannot get projects: " + JSON.stringify(err));
      }
    );
  }

  selectedProjectFunction(proj: Project): void {
    //window.alert(JSON.stringify(proj));
    this.selectedProject = proj;
    window.alert(JSON.stringify(proj));
    this.projectIteamContainer = [];
    this.addToProjectIteamContainer(this.selectedProject);

    this.canvasFunctions.clearCanvas(this.context, this.canvasWidth, this.canvasHeight);
    let tolarance = this.canvasFunctions.drawAxis(this.context, this.span, this.canvasHeight, this.canvasWidth, this.xQuandinateTolarance, this.yQuandinateTolarance);
    this.xQuandinateTolarance = tolarance.x;
    this.yQuandinateTolarance = tolarance.y;
    this.drawListOf2DPoints(this.vector2DFunctions.getListOf2DPointsForVector2DProject(this.projectIteamContainer, this.Vector2DList));
  }

  addToProjectIteamContainer(project: Project): void {
    this.projectIteamService.addToProjectIteamContainer(project, this.projectIteamContainer);
  }

  hoverOnProjectIteam(onHovering: boolean, iteam: IteamContainer): void {
    iteam.isHovering = onHovering;
  }

  selectedProjectIteam(iteam: IteamContainer, event: any): void {
    event.preventDefault();
    const vectorId: number = iteam.ref.vector2DId;
    let selectedVector = this.Vector2DList.find(vect => vect.id === vectorId);
    //window.alert(vectorId);
     this.tolarance = this.projectIteamService.selectedProjectIteam(selectedVector, iteam, this.vectorX, this.vectorY, this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.startingQuadinateX, this.startingQuadinateY, this.canvasWidth, this.canvasHeight, this.span);
    if (!this.tolarance.isTrue) {
      this.drawListOf2DPoints(this.vector2DFunctions.getListOf2DPointsForVector2DProject(this.projectIteamContainer, this.Vector2DList));
    }
  }

  //----------------------------------------Vector2D---------------------------------------------------------------

  getVector2D(): void {
    this.Vector2DObs = this.vector2D.getAllVector2DFromServer();
    this.Vector2DObs.subscribe(
      res => {
        this.Vector2DList = res;
        this.drawListOf2DPoints(this.vector2DFunctions.getListOf2DPointsForVector2D(this.iteamContain));
        this.vector2DFunctions.vector2DListToHTMLElementContainer(this.Vector2DList, this.iteamContain);
      },
      err => {
        window.alert("error cannot get vector2D: " + err);
      }
    );
  }

  //-----------------------------------------------Iteam-Dropdown--------------------------------------------------

  displayIteamValues(): void {
    this.iteamService.displayIteamValues(this.iteamSelectedMenue, this.Vector2DList, this.iteamContain);
  }

  selectedIteam(iteam: IteamContainer, event: any): void {
    event.preventDefault();
    //this.tolarance =
    this.iteamService.selectedIteam(this.selectedProject, this.projectIteamContainer, iteam, this.vectorX, this.vectorY, this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.startingQuadinateX, this.startingQuadinateY, this.canvasWidth, this.canvasHeight, this.span);
    // if (!this.tolarance.isTrue) {
    //   this.drawListOf2DPoints(this.vector2DFunctions.getListOf2DPointsForVector2D(this.iteamContain));
    // }
  }

  //----------------------------------------------Basic-Set-Up-----------------------------------------------------------
  
  showCoords(event: any) {
    let x = event.clientX;
    let y = event.clientY;
    this.coordinateX = x - 596;
    this.coordinateY = (y - 338) * -1;
  }

  frameChange(): void {
    if (this.selectedFrame === "Cartesian Frame") {

    } else {
      window.alert("under development");
    }
  }

  getStartingQuadinates(): void {
    this.startingCoord = this.canvasFunctions.getStartingQuadinates(document, this.startingQuadinateX, this.startingQuadinateY)
    this.startingQuadinateX = this.startingCoord.x;
    this.startingQuadinateY = this.startingCoord.y;

    this.getProjects();
  }
  

  //----------------------------------------------------Submit-Form----------------------------------------------------

  onSubmit(): void {
    if (this.iteamSelectedMenue === "Vector2D") {
      this.vectorPos = this.vector2DFunctions.addVector(this.selectedFrame, this.formDetails, this.vectorX, this.vectorY);
      this.vectorX = this.vectorPos.x;
      this.vectorY = this.vectorPos.y;
      this.canvasFunctions.drawVector(this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.vectorX, this.vectorY, this.startingQuadinateX, this.startingQuadinateY);
    }
  }

  //------------------------------------------------------Draw-On-Canvas------------------------------------------------

  drawListOf2DPoints(points2D: TwoDCoord[]): void {
    for (let p of points2D) {
      this.vectorX = p.x;
      this.vectorY = p.y;
      this.canvasFunctions.drawVector(this.context, this.xQuandinateTolarance, this.yQuandinateTolarance, this.vectorX, this.vectorY, this.startingQuadinateX, this.startingQuadinateY);
    }
  }
}