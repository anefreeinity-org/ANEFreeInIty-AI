import { Component } from '@angular/core';
import { Vector2DService } from './vector2-d.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AIFrontEND';
  constructor(private vector2D: Vector2DService) {
    //window.alert("hi");
    vector2D.getAllVector2DFromServer();
  }
}
