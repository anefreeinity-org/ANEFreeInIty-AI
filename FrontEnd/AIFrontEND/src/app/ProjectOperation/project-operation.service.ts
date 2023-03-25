import { AppModule } from './../app.module';
import { ProjectIteamMapper } from './../Model/ProjectIteamMapper';
import { Project } from './../Model/Project';
import { Injectable } from '@angular/core';
import { IteamContainer } from '../Model/IteamContainer';
import { ProjectService } from '../project.service';
import { ProjectEditComponent } from '../DialougeBox/project-edit/project-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ProjectOperationService {

  constructor(
    private projectService: ProjectService,
    private projectEditDialouge: MatDialog
  ) { }

  saveProject(projectIteamContainer: IteamContainer[], projects: Project[]) : void {
    let updatedProject: Project = new Project();
    let updateProjectIteamMapper: ProjectIteamMapper[] = [];
    for(let pic of projectIteamContainer){
      updateProjectIteamMapper.push(pic.ref);
    }
    updatedProject.id = projectIteamContainer[0].ref.projectId;
    let currentProject = projects.find(p => p.id === updatedProject.id);
    updatedProject.name = currentProject?.name;
    updatedProject.description = currentProject?.description;
    updatedProject.projectMapper = updateProjectIteamMapper;

    //window.alert(JSON.stringify(updatedProject));

    this.projectService.updateProject(Number(currentProject?.id), updatedProject).subscribe(
      res=>{
        //window.alert(JSON.stringify(res));
      },
      err=>{
        window.alert("something went wrong");
      });
  }

  editProject(project: any, event: any): void {
    event.preventDefault();
    //window.alert(JSON.stringify(project));
    const dialogRefD = this.projectEditDialouge.open(ProjectEditComponent, {
      data : {
        id: project.id,
        projectId: project.projectId,
        iteamId: project.vector2DId,
        iteamName: project.vector2DName,
        iteamStatus: project.iteamStatus
      },
    }
    );

    // dialogRefD.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
