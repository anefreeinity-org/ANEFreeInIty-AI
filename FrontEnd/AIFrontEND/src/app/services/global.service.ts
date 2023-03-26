import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICanvasModel } from '../Model/General';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  currentCanvasStatus: BehaviorSubject<ICanvasModel> = new BehaviorSubject(<ICanvasModel>{});
  constructor() { }

  getCurrentCanvasStatus(): ICanvasModel {
    return this.currentCanvasStatus.getValue();
  }

  setCurrentCanvasStatus(setCanvasData: ICanvasModel): void {
    this.currentCanvasStatus.next(setCanvasData);
  }
}
