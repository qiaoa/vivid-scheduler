import { Component, OnInit } from '@angular/core';
import { Checkpoint, Project } from '../models/data-models';
import { ProjectService } from '../services/project.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-project-page',
  templateUrl: './update-project-page.component.html',
  styleUrls: ['./update-project-page.component.css']
})

export class UpdateProjectPageComponent implements OnInit {

  projects: Observable<Project[]>;

  selectedProject: any;


  // available project types
  types = ['Instagram Reel', 'Youtube Video', 'TikTok', 'Other'];

  constructor(private _ProjectService: ProjectService, private modalService: NgbModal) { }

  ngOnInit(): void {
    //this._ProjectService.getProjects();
    this.bindSelectProjectDropdown();
  }

  // bind the select project dropdown
  bindSelectProjectDropdown() {
    this.projects = this._ProjectService.getProjects();
    this.projects.subscribe(e => console.log(e));
  }

  // when selection is made, pop up 

  open(content: any, project: Project) {
    this.selectedProject = project;

    this.modalService.open(content, {ariaLabelledBy: 'modal-update-title'}).result.then((result) => {
      if (result === 'save') {
        console.log('calling projectservice: ' + JSON.stringify(this.selectedProject));
        this._ProjectService.changeProject(this.selectedProject).subscribe();
      }
    }, (reason) => {
      // if the modal is closed unexpectedly
      console.log('error: ' + reason);
    });
  }

  delete(modalRef: any) {
    if (confirm('Are you sure you want to save delete this project?')) {
      // Save it!
      console.log('pname: ' + this.selectedProject.pname);
      this._ProjectService.deleteProject(this.selectedProject.pname).subscribe((e) => { 
                this.bindSelectProjectDropdown();
              });
      modalRef.close('delete');
    }
  }
}