import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalendarPageComponent } from './calendar-page.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import {Pipe, PipeTransform} from '@angular/core';
import { CalendarAngularDateFormatter } from 'angular-calendar';

import { FormsModule } from '@angular/forms';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { CalendarDatePipe } from 'angular-calendar/modules/common/calendar-date.pipe';

@Pipe({name: 'calendarDate'})
class MockPipe implements PipeTransform {
    transform(value: number): number {
        // blah blah
        return value;
    }
}

describe('CalendarPageComponent', () => {
  let component: CalendarPageComponent;
  let fixture: ComponentFixture<CalendarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarPageComponent, MockPipe  ], 
      imports: [ HttpClientTestingModule, 
        FormsModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }) 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
