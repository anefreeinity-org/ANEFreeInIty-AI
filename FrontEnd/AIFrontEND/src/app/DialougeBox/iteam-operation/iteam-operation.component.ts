import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { validateVerticalPosition } from '@angular/cdk/overlay';

export interface OperationData {
  data: string;
  operation: string;
  scale: number | null;
}

@Component({
  selector: 'app-iteam-operation',
  templateUrl: './iteam-operation.component.html',
  styleUrls: ['./iteam-operation.component.css']
})
export class IteamOperationComponent implements OnInit {

  options: string[] = ['ADD', 'SUB', 'S MAL', 'LINEAR COMBINATION', 'DOT PRODUCT'];
  scales: number[] = [0.5, 0.25, 0.125, 0.0625];

  currentIteam: string = '';
  //operationName: string = 'Nothing Selected';
  operation: string = 'Nothing Selected';
  projectName: string = '';
  placeHolder: string = '';
  showScaleControl: boolean = false;

  operationControl = new FormControl(null, Validators.required);
  scaleControl = new FormControl(this.scales[0]);
  formDetails = this.formBuilder.group({
    iteamData: ['', Validators.required],
    operation: this.operationControl,
    scale: this.scaleControl
  });

  constructor(
    public dialogRefD: MatDialogRef<IteamOperationComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentIteam = data.currentIteam;
    this.projectName = data.currentProjectName;
    this.dialogRefD.disableClose = true;
  }

  ngOnInit(): void {
    this.whichOperation();
  }

  whichOperation(): void {
    switch (this.operation) {
      case 'ADD': this.placeHolder = "[x1,y1];[x2,y2]";
        break;
      case 'SUB': this.placeHolder = "[x1,y1];[x2,y2]";
        break;
      case 'S MAL': this.placeHolder = "[x1,y1];sVal";
        break;
      case 'LINEAR COMBINATION': this.placeHolder = "[x1,y1];[x2,y2];[xR,yR]";
        break;
      case 'DOT PRODUCT': this.placeHolder = "[x1,y1];[x2,y2]";
        break;
      default: this.placeHolder = '';
    }
  }

  currentSelectedOperation(event: any) {
    this.operation = event;
    if (event === 'LINEAR COMBINATION') {
      this.showScaleControl = true;
      this.formDetails.get('scale')?.addValidators(Validators.required);
    } else {
      this.showScaleControl = false;
      this.formDetails.get('scale')?.removeValidators(Validators.required);
    }
    this.whichOperation();
  }

  currentSelectedScale(event: any) {
    //window.alert(event);
  }

  onSubmit(): void {
    let retVal: OperationData = <OperationData>{};
    retVal.data = this.formDetails.get('iteamData')?.value;
    retVal.operation = this.formDetails.get('operation')?.value;
    if(this.operation === 'LINEAR COMBINATION') {
      retVal.scale = this.formDetails.get('scale')?.value;
    } else {
      retVal.scale = null;
    }
    //window.alert(JSON.stringify(retVal));
    this.dialogRefD.close(retVal);
  }

  onClose(): void {
    this.dialogRefD.close();
  }
}
