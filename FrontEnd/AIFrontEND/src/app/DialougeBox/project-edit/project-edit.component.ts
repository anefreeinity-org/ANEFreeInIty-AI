import { ProjectIteamMapper } from './../../Model/ProjectIteamMapper';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProject, Project } from 'src/app/Model/Project';

interface Model {
  id: number,
  projectId: number,
  iteamId: number,
  iteamName: string,
  iteamStatus: number
}

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent {
  project: Model;
  currentModel: ProjectIteamMapper | null;
  projectIteamMapperId: number;
  projectId: number;
  iteamId: number;
  iteamName: string;
  projectName: string;
  iteamStatus: boolean;

  constructor(public dialogRefD: MatDialogRef<ProjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.project = data;
      //window.alert(JSON.stringify(this.project));
    this.projectIteamMapperId = this.project.id;
    this.projectId = this.project.projectId;
    this.iteamId = this.project.iteamId;
    this.iteamName = this.project.iteamName;
    this.iteamStatus = (this.project.iteamStatus) == 1 ? true : false;
  }
}
//app-project-edit