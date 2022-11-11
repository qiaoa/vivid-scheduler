import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './models/data-models';
//import * as internal from 'stream';

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService {

  _url = 'http://localhost:4200/'
  constructor(private _http: HttpClient) { }

  // make a post request to the server   
  addProject(project: Project) {
    console.log(project)
    return this._http.post<any>(this._url+"api/projects", project);
  }
}
