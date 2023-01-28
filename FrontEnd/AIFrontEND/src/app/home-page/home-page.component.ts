import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit{

  w = 1199;
  h = 674;
  span = 20;

  coordinateX: number;
  coordinateY: number;

  myCanvas: any;
  context: any;

  constructor(@Inject(DOCUMENT) document: Document) { }

  ngOnInit(): void {
    this.myCanvas = document.getElementById("canvas");
    this.w = this.myCanvas.clientWidth;
    this.h = this.myCanvas.clientHeight;
    this.context = this.myCanvas.getContext("2d");

    this.drawAxis();
    //this.func();
  }

  drawAxis(){
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(' + [40, 40, 40, 0.3] + ')';

    for(var x = this.span; x < this.h; x+=this.span){
      this.context.moveTo(0,x);
      this.context.lineTo(this.w,x);
      this.context.stroke();
    }

    for(var x = this.span; x < this.w; x+=this.span){
      this.context.moveTo(x,0);
      this.context.lineTo(x,this.w);
      this.context.stroke();
    }

    this.context.beginPath();
    this.context.strokeStyle = 'rgba(' + [255, 0, 13, 1] + ')';

    var horizontalLine = this.span*Math.floor(Math.floor(this.h/this.span)/2);
    var verticalLine = this.span*Math.floor(Math.floor(this.w/this.span)/2);

    this.context.moveTo(verticalLine,0);
    this.context.lineTo(verticalLine,this.h);
    this.context.stroke();

    this.context.moveTo(0,horizontalLine);
    this.context.lineTo(this.w,horizontalLine);
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
    this.coordinateX = x - 588;
    this.coordinateY = (y - 328)*-1;
}
}
