import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { validateVerticalPosition } from '@angular/cdk/overlay';

export interface OperationData {
  data: string;
  operation: string;
}

@Component({
  selector: 'app-iteam-operation',
  templateUrl: './iteam-operation.component.html',
  styleUrls: ['./iteam-operation.component.css']
})
export class IteamOperationComponent implements OnInit {

  options: string[] = ['ADD', 'SUB', 'S MAL'];

  currentIteam: string = '';
  //operationName: string = 'Nothing Selected';
  operation: string = 'Nothing Selected';
  projectName: string = '';
  placeHolder: string = '';

  operationControl = new FormControl(null, Validators.required);
  formDetails = this.formBuilder.group({
    iteamData: ['', Validators.required],
    operation: this.operationControl
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
      default: this.placeHolder = '';
    }
  }

  currentSelectedOperation(event: any) {
    this.operation = event;
    this.whichOperation();
  }

  onSubmit(): void {
    let retVal: OperationData = <OperationData>{};
    retVal.data = this.formDetails.get('iteamData')?.value;
    retVal.operation = this.formDetails.get('operation')?.value;
    window.alert(JSON.stringify(retVal));
    this.dialogRefD.close(retVal);
  }

  onClose(): void {
    this.dialogRefD.close();
  }
}
