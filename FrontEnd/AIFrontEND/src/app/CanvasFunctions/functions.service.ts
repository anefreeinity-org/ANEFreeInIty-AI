import { GlobalService } from './../services/global.service';
import { Injectable } from '@angular/core';
import { ICanvasModel } from '../Model/General';
import { TwoDCoord } from '../Vector2D/crudrequest2.service';
import { ICoordinate2D } from '../Model/Coordinates';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private globalService: GlobalService
  ) { }

  drawAxis() {
    let canvasData: ICanvasModel = <ICanvasModel>{};
    canvasData = this.globalService.getCurrentCanvasStatus();
    canvasData.context.beginPath();
    canvasData.context.strokeStyle = 'rgba(' + [40, 40, 40, 0.3] + ')';

    for (var x = canvasData.span; x < canvasData.canvasHeight; x += canvasData.span) {
      canvasData.context.moveTo(0, x);
      canvasData.context.lineTo(canvasData.canvasWidth, x);
      canvasData.context.stroke();
    }

    for (var x = canvasData.span; x < canvasData.canvasWidth; x += canvasData.span) {
      canvasData.context.moveTo(x, 0);
      canvasData.context.lineTo(x, canvasData.canvasWidth);
      canvasData.context.stroke();
    }

    canvasData.context.beginPath();
    canvasData.context.strokeStyle = 'rgba(' + [255, 0, 13, 1] + ')';

    var horizontalLine = canvasData.span * Math.floor(Math.floor(canvasData.canvasHeight / canvasData.span) / 2);
    var verticalLine = canvasData.span * Math.floor(Math.floor(canvasData.canvasWidth / canvasData.span) / 2);

    canvasData.xQuandinateTolarance = verticalLine;
    canvasData.yQuandinateTolarance = horizontalLine;

    canvasData.context.moveTo(verticalLine, 0);
    canvasData.context.lineTo(verticalLine, canvasData.canvasHeight);
    canvasData.context.stroke();

    canvasData.context.moveTo(0, horizontalLine);
    canvasData.context.lineTo(canvasData.canvasWidth, horizontalLine);
    canvasData.context.stroke();

    this.globalService.setCurrentCanvasStatus(canvasData);
  }

  drawVector(vectorX: number, vectorY: number, color: string = '#35baf2'): void {
    let canvasData: ICanvasModel = <ICanvasModel>{};
    canvasData = this.globalService.getCurrentCanvasStatus();

    console.log(color);

    let spX = canvasData.startingQuadinateX + canvasData.xQuandinateTolarance;
    let spY = canvasData.yQuandinateTolarance - canvasData.startingQuadinateY;
    let epX = spX + vectorX;
    let epY = spY - vectorY;

    canvasData.context.beginPath();
    canvasData.context.strokeStyle = 'rgba(' + [0, 239, 255, 1] + ')';
    canvasData.context.moveTo(spX, spY);
    canvasData.context.lineTo(epX, epY);
    this.drawArrow(spX, spY, epX, epY);
    canvasData.context.strokeStyle = color;
    canvasData.context.stroke();
  }

  drawArrow(fromx: number, fromy: number, tox: number, toy: number): void {
    let canvasData: ICanvasModel = <ICanvasModel>{};
    canvasData = this.globalService.getCurrentCanvasStatus();
    var headlen = 10;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    canvasData.context.moveTo(fromx, fromy);
    canvasData.context.lineTo(tox, toy);
    canvasData.context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    canvasData.context.moveTo(tox, toy);
    canvasData.context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

  clearCanvas(): void {
    let canvasData: ICanvasModel = <ICanvasModel>{};
    canvasData = this.globalService.getCurrentCanvasStatus();
    canvasData.context.clearRect(0, 0, canvasData.canvasWidth, canvasData.canvasHeight);
  }

  getStartingQuadinates(documentA: any) {
    let canvasData: ICanvasModel = <ICanvasModel>{};
    canvasData = this.globalService.getCurrentCanvasStatus();

    let value = (<HTMLInputElement>documentA.getElementById("starting-quad-data")).value;
    let quadinates: string[] = value.split(',');
    canvasData.startingQuadinateX = Number(quadinates[0]);
    canvasData.startingQuadinateY = Number(quadinates[1]);
    this.globalService.setCurrentCanvasStatus(canvasData);
  }

  drawListOf2DCoordinates(points2D: ICoordinate2D[]): void {
    let vectorX;
    let vectorY;

    this.clearCanvas();
    this.drawAxis();

    for (let p of points2D) {
      vectorX = p.x;
      vectorY = p.y;
      this.drawVector(vectorX, vectorY, p.color);
    }
  }
}