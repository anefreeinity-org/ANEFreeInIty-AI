import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-iteam-operation',
  templateUrl: './iteam-operation.component.html',
  styleUrls: ['./iteam-operation.component.css']
})
export class IteamOperationComponent implements OnInit {

  currentIteam: string = '';
  operation: number = -1;
  operationName: string = '';
  projectName: string = '';
  placeHolder: string = '';

  formDetails = this.formBuilder.group({
    iteamData: ['', Validators.required]
  });

  constructor(
    public dialogRefD: MatDialogRef<IteamOperationComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentIteam = data.currentIteam;
    this.operation = data.operation;
    this.projectName = data.currentProjectName;
    this.dialogRefD.disableClose = true; 
   }

   ngOnInit(): void {
    this.whichOperation();
   }

  whichOperation(): void {
    switch(this.operation) {
      case 1 : this.placeHolder = "[x1,y1];[x2,y2]";
               this.operationName = "ADD";
               break;
      default: this.placeHolder = '';
               this.operationName = '';
    }
  }

  onSubmit(): void {
    let retVal = this.formDetails.get('iteamData')?.value;
    this.dialogRefD.close(retVal);
  }

  onClose(): void {
    this.dialogRefD.close();
  }
}
