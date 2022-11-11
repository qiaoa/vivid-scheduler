import { Component, OnInit } from '@angular/core';
import { Project } from '../models/data-models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-display-project-page',
  templateUrl: './display-project-page.component.html',
  styleUrls: ['./display-project-page.component.css']
})
export class DisplayProjectPageComponent implements OnInit {
  
  projects: Array<String>;
  newProject: Project;
  projectName: string;
  projectURL: string;

  constructor(
    private _ProjectService: ProjectService,) { 
    this.projectName = '';
    this.projectURL = ' ';
    this.projects = [];
    this._ProjectService.getProjects().subscribe(
      response => {
        console.log(response);
        // add project names into projects list
        for (let x of response){
          this.projects.push(x.pname);
        } 
      }, err => console.log(err)
    );

  }

  ngOnInit(): void {
  }

  onSubmit(data:any) {
    this._ProjectService.updateProject(data).subscribe(
      data => console.log(data)
    )
  };
    // update project 

}
