import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

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

  constructor(@Inject(DOCUMENT) document: Document) { }

  ngOnInit(): void {
    this.myCanvas = document.getElementById("canvas");
    this.canvasWidth = this.myCanvas.clientWidth;
    this.canvasHeight = this.myCanvas.clientHeight;
    this.context = this.myCanvas.getContext("2d");

    this.drawAxis();
    //this.func();
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

getVector(): void {
  let value = (<HTMLInputElement>document.getElementById("vector-data")).value;
  let quadinates: string[] = value.split(',');
  this.vectorX = Number(quadinates[0]);
  this.vectorY = Number(quadinates[1]);
  //window.alert(this.vectorX+", "+this.vectorY);
  this.drawVector();
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
  //window.alert(this.startingQuadinateX+", "+this.startingQuadinateY);
}
}
