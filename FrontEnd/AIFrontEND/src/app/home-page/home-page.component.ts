import { Vector2D } from './../Model/Vector2D';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Vector2DService } from '../vector2-d.service';
import { Observable } from 'rxjs';
import { iteams } from '../Model/Iteams';
import { IteamContainer } from '../Model/IteamContainer';
import { Router } from '@angular/router';
import { frames } from '../Model/referenceFrame';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit{

  canvasWidth = 1199;
  canvasHeight = 674;
  span = 20;

  xQuandinateTolarance: number = 0;
  yQuandinateTolarance: number = 0;

  vectorX: number = 0;
  vectorY: number = 0;

  startingQuadinateX: number = 0;
  startingQuadinateY: number = 0;

  coordinateX: number;
  coordinateY: number;

  myCanvas: any;
  context: any;

  Vector2DObs : Observable<Vector2D[]>;
  Vector2DList : Vector2D[];

  iteamMenue: string[] = iteams;
  iteamSelectedMenue: string = "Vector2D";
  iteamContain: IteamContainer[] = [];
  ishoveringOnIteam: boolean = false;

  referenceFrameList: string[] = frames;
  selectedFrame: string = this.referenceFrameList[0];

  constructor(
    @Inject(DOCUMENT) document: Document,
    private vector2D: Vector2DService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.myCanvas = document.getElementById("canvas");
    this.canvasWidth = this.myCanvas.clientWidth;
    this.canvasHeight = this.myCanvas.clientHeight;
    this.context = this.myCanvas.getContext("2d");

    this.drawAxis();
    this.getVector2D();
    //this.func();
  }

  getVector2D() : void {
    this.Vector2DObs = this.vector2D.getAllVector2DFromServer();
    this.Vector2DObs.subscribe(
      res=>{
        this.Vector2DList = res;
        //window.alert(JSON.stringify(this.Vector2DList));
        this.drawVector2D();
        this.vector2DMethod();
      },
      err=>{
        window.alert("error cannot get vector2D: " + err);
      }
    );
  }

  drawVector2D() : void {
    //window.alert("hi");
    
    // for(let v of this.Vector2DList){
    //   this.vectorX = Number(v.x);
    //   this.vectorY = Number(v.y);
    //   this.drawVector();
    // }

    for(let v of this.iteamContain){
      if(v.isAdded){
        this.vectorX = Number(v.ref.x);
        this.vectorY = Number(v.ref.y);
        this.drawVector();
      }
    }
  }

  drawAxis(){
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(' + [40, 40, 40, 0.3] + ')';

    for(var x = this.span; x < this.canvasHeight; x+=this.span){
      this.context.moveTo(0,x);
      this.context.lineTo(this.canvasWidth,x);
      this.context.stroke();
    }

    for(var x = this.span; x < this.canvasWidth; x+=this.span){
      this.context.moveTo(x,0);
      this.context.lineTo(x,this.canvasWidth);
      this.context.stroke();
    }

    this.context.beginPath();
    this.context.strokeStyle = 'rgba(' + [255, 0, 13, 1] + ')';

    var horizontalLine = this.span*Math.floor(Math.floor(this.canvasHeight/this.span)/2);
    var verticalLine = this.span*Math.floor(Math.floor(this.canvasWidth/this.span)/2);

    this.xQuandinateTolarance = verticalLine;
    this.yQuandinateTolarance = horizontalLine;

    this.context.moveTo(verticalLine,0);
    this.context.lineTo(verticalLine,this.canvasHeight);
    this.context.stroke();

    this.context.moveTo(0,horizontalLine);
    this.context.lineTo(this.canvasWidth,horizontalLine);
    this.context.stroke();
}

displayIteamValues(): void {
  //window.alert(this.iteamSelectedMenue);
  switch(this.iteamSelectedMenue){
    case "Vector2D" : this.vector2DMethod();
                      break;
    
    case "Vector3D" : window.alert("Vector3D is under development");
                      break;

    case "Matrix" : window.alert("Matrix is under development");
                      break;

    default: window.alert("something went wrong");
  }
}

frameChange(): void {
  //window.alert(this.selectedFrame);
  if(this.selectedFrame === "Cartesian Frame"){
    
  } else {
    window.alert("under development");
  }
}

vector2DMethod(): void {
  //this.test();
  let pushIteamMember: IteamContainer;
  
  for(let v of this.Vector2DList){
    pushIteamMember = new IteamContainer();
    pushIteamMember.id = Number(v.id);
    pushIteamMember.name = v.description;
    pushIteamMember.ref = v;

    this.iteamContain.push(pushIteamMember);
  }
}

selectedIteam(iteam: IteamContainer, event: any): void {
  event.preventDefault();
  const vector: Vector2D = iteam.ref;
  if(!iteam.isAdded){
    iteam.isAdded = true;
    this.vectorX = Number(vector.x);
    this.vectorY = Number(vector.y);
    this.drawVector();
  } else {
    iteam.isAdded = false;
    this.clearCanvas();
    this.drawAxis();
    this.drawVector2D();
  }
  
}

func(){
    this.context.beginPath();
    this.context.moveTo(20, 20);
    this.context.lineTo(20, 100);
    //canvas_ctx.lineTo(70, 100);
    this.context.strokeStyle = "red";
    this.context.stroke();
}

showCoords(event: any) {
    let x = event.clientX;
    let y = event.clientY;
    this.coordinateX = x - 596;
    this.coordinateY = (y - 338)*-1;
}

addVector(): void {
  let value = (<HTMLInputElement>document.getElementById("vector-data")).value;
  let quadinates: string[] = value.split(',');
  this.vectorX = Number(quadinates[0]);
  this.vectorY = Number(quadinates[1]);

  let newVector: Vector2D = new Vector2D();
  newVector.x = this.vectorX;
  newVector.y = this.vectorY;

  this.vector2D.postVector2D(newVector).subscribe(
    res=>{
      window.alert("vector 2d added");
      //this.getVector2D();
    },
    err=>{
      window.alert("vector2d cannot be added: "+err);
    }
  );

  //window.alert(this.vectorX+", "+this.vectorY);
  this.drawVector();
}

deleteThisVector(vector: IteamContainer): void {
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

hoverOnIteam(onHovering: boolean, iteam: IteamContainer): void {
  iteam.isHovering = onHovering;
  //window.alert(this.ishoveringOnIteam);
}

drawVector(): void {
  let spX = this.startingQuadinateX+this.xQuandinateTolarance;
  let spY = this.yQuandinateTolarance - this.startingQuadinateY;
  let epX = spX+this.vectorX;
  let epY = spY-this.vectorY;

  this.context.beginPath();
  this.context.strokeStyle = 'rgba(' + [0, 239, 255, 1] + ')';
  this.context.moveTo(spX,spY);
  this.context.lineTo(epX,epY);
  this.drawArrow(spX, spY, epX, epY);
  this.context.stroke();
}

clearCanvas(): void {
  this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
}

drawArrow(fromx: number, fromy: number, tox: number, toy: number): void {
  var headlen = 10;
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  this.context.moveTo(fromx, fromy);
  this.context.lineTo(tox, toy);
  this.context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  this.context.moveTo(tox, toy);
  this.context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

getStartingQuadinates(): void {
  let value = (<HTMLInputElement>document.getElementById("starting-quad-data")).value;
  let quadinates: string[] = value.split(',');
  this.startingQuadinateX = Number(quadinates[0]);
  this.startingQuadinateY = Number(quadinates[1]);

  this.getVector2D();
  //window.alert(this.startingQuadinateX+", "+this.startingQuadinateY);
}

test(): void {
  window.alert("ok");
}

tracked(item: any, index: any){
  return index;
}
}
