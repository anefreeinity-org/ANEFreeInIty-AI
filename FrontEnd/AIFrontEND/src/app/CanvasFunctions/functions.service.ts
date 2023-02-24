import { Injectable } from '@angular/core';
import { TwoDCoord } from '../Vector2D/crudrequest2.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  drawAxis(context: any, span: number, canvasHeight: number, canvasWidth: number, xQuandinateTolarance: number, yQuandinateTolarance: number): TwoDCoord {
    context.beginPath();
    context.strokeStyle = 'rgba(' + [40, 40, 40, 0.3] + ')';

    for (var x = span; x < canvasHeight; x += span) {
      context.moveTo(0, x);
      context.lineTo(canvasWidth, x);
      context.stroke();
    }

    for (var x = span; x < canvasWidth; x += span) {
      context.moveTo(x, 0);
      context.lineTo(x, canvasWidth);
      context.stroke();
    }

    context.beginPath();
    context.strokeStyle = 'rgba(' + [255, 0, 13, 1] + ')';

    var horizontalLine = span * Math.floor(Math.floor(canvasHeight / span) / 2);
    var verticalLine = span * Math.floor(Math.floor(canvasWidth / span) / 2);

    xQuandinateTolarance = verticalLine;
    yQuandinateTolarance = horizontalLine;

    context.moveTo(verticalLine, 0);
    context.lineTo(verticalLine, canvasHeight);
    context.stroke();

    context.moveTo(0, horizontalLine);
    context.lineTo(canvasWidth, horizontalLine);
    context.stroke();

    // window.alert(xQuandinateTolarance);
    // window.alert(yQuandinateTolarance);

    let tolarance = new TwoDCoord();
    tolarance.x = xQuandinateTolarance;
    tolarance.y = yQuandinateTolarance;

    return tolarance;
  }

  drawVector(context: any, xQuandinateTolarance: number, yQuandinateTolarance: number, vectorX: number, vectorY: number, startingQuadinateX: number, startingQuadinateY: number): void {
    // window.alert(xQuandinateTolarance);
    // window.alert(yQuandinateTolarance);
    // window.alert(vectorX);
    // window.alert(vectorY);
    let spX = startingQuadinateX + xQuandinateTolarance;
    let spY = yQuandinateTolarance - startingQuadinateY;
    let epX = spX + vectorX;
    let epY = spY - vectorY;

    context.beginPath();
    context.strokeStyle = 'rgba(' + [0, 239, 255, 1] + ')';
    context.moveTo(spX, spY);
    context.lineTo(epX, epY);
    this.drawArrow(spX, spY, epX, epY, context);
    context.stroke();
  }

  drawArrow(fromx: number, fromy: number, tox: number, toy: number, context: any): void {
    var headlen = 10;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

  clearCanvas(context: any, canvasWidth: number, canvasHeight: number): void {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  getStartingQuadinates(documentA: any, startingQuadinateX: number, startingQuadinateY: number): TwoDCoord {
    let value = (<HTMLInputElement>documentA.getElementById("starting-quad-data")).value;
    let quadinates: string[] = value.split(',');
    startingQuadinateX = Number(quadinates[0]);
    startingQuadinateY = Number(quadinates[1]);

    let startingCoord = new TwoDCoord();
    startingCoord.x = startingQuadinateX;
    startingCoord.y = startingQuadinateY;
    return startingCoord;
  }
}
