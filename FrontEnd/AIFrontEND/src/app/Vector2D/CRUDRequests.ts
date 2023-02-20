import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HomePageComponent } from "../home-page/home-page.component";
import { Vector2D } from "../Model/Vector2D";
import { Vector2DService } from "../vector2-d.service";

export let Vector2DList1 : Vector2D[];

@Injectable({
    providedIn: 'root'
  })

export class CRUDVector2D {

    Vector2DObs1 : Observable<Vector2D[]>;
    vector2D1: Vector2DService;
    
    // getVector2D1() : void {
    //     this.Vector2DObs = this.vector2D.getAllVector2DFromServer();
    //     this.Vector2DObs.subscribe(
    //       res=>{
    //         this.Vector2DList = res;
    //         window.alert(JSON.stringify(this.Vector2DList));
    //         this.drawVector2D();
    //         this.vector2DMethod();
    //       },
    //       err=>{
    //         window.alert("error cannot get vector2D: " + err);
    //       }
    //     );
    //   }
    ok(){window.alert("hi2");}
}