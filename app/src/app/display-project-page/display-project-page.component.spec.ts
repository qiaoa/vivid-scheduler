import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayProjectPageComponent } from './display-project-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('DisplayProjectPageComponent', () => {
  let component: DisplayProjectPageComponent;
  let fixture: ComponentFixture<DisplayProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProjectPageComponent ], 
      imports: [ HttpClientTestingModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
