//This class is responsible for handling the calendar's behavior.
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { Project } from '../project';
import { ProjectService } from '../services/project.service';

interface MyEvent extends CalendarEvent {
  description:string;
  projectType:string;
  projectOwner:string;
}

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})

export class CalendarPageComponent implements OnInit {
  //Will hold the value of why the modal was closed 
  closeResult:string;

  //Will hold all of the projects coming from the database 
  projects: Project[];

  //Will hold all of the project deadlines/dates  
  events: MyEvent[] = []

  constructor(
    private _ProjectService: ProjectService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    this.getProjects();
  }

  //Retrieves the projdata from the DB and populates them into an array of events
  getProjects(){
    this._ProjectService.getProjects().subscribe(
      response => {
        this.projects = response;

        console.log(response);
        for (let x of this.projects){
          //The client's don't have specific times within the day for deadlines, so we're 
          // setting the hours to zero so everything is standard. 
          console.log(x.checkpoints);
          console.log(x.checkpoints[0].date)
          console.log(x.checkpoints[0].title)

          for (let y of x.checkpoints){
            var projDate = new Date(y.date);
            projDate.setHours(0, 0, 0, 0);
  
            let fullName = x.pname + " " + y.title
            //Adding onto our array of events
            this.events = [
              ...this.events, {
              start: new Date(projDate), 
              title: fullName,
              description: x.description,
              projectType: x.ptype,
              projectOwner: x.powner
              }, 
            ]
          }
        } 
      }
    );
  }


  viewDate: Date = new Date();

  //Holds the value of which view (Monthly, weekly, daily) the user has chosen for hte calendar
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  //Holds the value of what date the user is clicking on the calendar 
  dateClickedOn: Date = new Date();

  //Sets the view of the calendar (daily, monthly, weekly)
  setView(view: CalendarView) {
    this.view = view;
  }

  //Handles modal opening. The modal will display all the project deadlines associated with that day.
  open(content: any, { date, events }: { date: Date; events: CalendarEvent[] }) {
    this.dateClickedOn = date;

    // Checking if there are events on the day the user is clicking in
    let isEvent = false;
    for(let event of events){
      if (event.start.getTime() == this.dateClickedOn.getTime()){
        isEvent = true;
      }
    }

    // Only showing the modal if there are events on that day 
    if (isEvent){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  //Handles modal dismissing 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
