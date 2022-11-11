import { Component, OnInit } from '@angular/core';
import { Checkpoint, Project } from '../models/data-models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-create-project-page',
  templateUrl: './create-project-page.component.html',
  styleUrls: ['./create-project-page.component.css']
})

export class CreateProjectPageComponent implements OnInit {

  constructor(private _ProjectService: ProjectService) { }

  ngOnInit(): void {
  }

  // available project types
  types = ['Instagram Reel', 'Youtube Video', 'TikTok', 'Other'];

  // create project object associated with this specific form
  currentTime = new Date()
  projectModel = new Project(1, '', '', '', this.currentTime, [new Checkpoint('', '', this.currentTime)],'', 'No', ' ');

  submitted = false;



  onSubmit(data: any) {
    this.submitted = true; 

    // create checkpoint list based on startDate
    // increment each checkpoint by 1 week
    let myStartDate = new Date(data.startDate)
    data.checkPoints = [new Checkpoint(data.pname, data.pname + ' Checkpoint 1', myStartDate), new Checkpoint(data.pname, data.pname + ' Checkpoint 2', new Date(myStartDate.getDate() + 7))]

    // update project object for this specific form submission to match input data
    this.projectModel.pname = data.pname
    this.projectModel.powner = data.powner
    this.projectModel.ptype = data.ptype
    this.projectModel.pstartDate = data.pstartDate
    this.projectModel.pdescription = data.pdescription
    this.projectModel.checkPoints = data.checkPoints
    data.completed = 'No'
    data.url = ' '

    // register the new project to server
    this._ProjectService.addProject(data)
    .subscribe(
      data => console.log(data)
    )

    // successful project submission
    alert('SUCCESS: ' + data.pname + ' created')
  }

}

