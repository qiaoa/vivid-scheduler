import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HttpClientModule } from '@angular/common/http';
import { NgGanttEditorModule } from 'ng-gantt' 
import { MatListModule } from '@angular/material/list';

import { HomePageComponent } from './home-page/home-page.component';
import { CreateProjectPageComponent } from './create-project-page/create-project-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { UpdateProjectPageComponent } from './update-project-page/update-project-page.component';
import { DisplayProjectPageComponent } from './display-project-page/display-project-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { GanttChartPageComponent } from './gantt-chart-page/gantt-chart-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateProjectPageComponent,
    CalendarPageComponent,
    UpdateProjectPageComponent,
    LoginPageComponent,
    GanttChartPageComponent,
    DisplayProjectPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgGanttEditorModule,
    NgbModule,
    MatListModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
     BrowserAnimationsModule,
     NgbModule
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
