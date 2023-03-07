import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProject, Project } from 'src/app/Model/Project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent {
  project: IProject;
  //constructor(){}
  constructor(public dialogRefD:MatDialogRef<ProjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProject) { this.project = data }

}
//app-project-edit