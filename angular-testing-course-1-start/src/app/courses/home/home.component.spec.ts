import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  // making the spy available globally.
  // We give it the type of any since we are returning the actual Courses Service but the spy.
  let coursesService: any;

  const beginnerCourses = setupCourses().filter( course => course.category === 'BEGINNER' );

  beforeEach( async(() => {

    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

    TestBed.configureTestingModule({

      imports: [
        CoursesModule,
        // No Operations animations module.
        NoopAnimationsModule
      ],
      providers: [
        // Here we will need a mock instance of the courses service
        // in the form of a jasmine spy
        {
          provide: CoursesService,
          useValue: coursesServiceSpy
        }
      ]

    })
    .compileComponents()
    .then( () => {

      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      coursesService = TestBed.get(CoursesService);

    });


  }));

  it('should create the component', () => {

    expect(component).toBeTruthy();

  });


  it('should display only beginner courses', () => {

    // The courses sevice expects to return an observable, not an array of courses.
    // thus we wrap the beginnerCourses variable in an rx/js of() method.
    coursesService.findAllCourses
      .and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, 'Unexpected number of tabs found.');

  });


  it('should display only advanced courses', () => {

      pending();

  });


  it('should display both tabs', () => {

    pending();

  });


  it('should display advanced courses when tab clicked', () => {

    pending();

  });

});


