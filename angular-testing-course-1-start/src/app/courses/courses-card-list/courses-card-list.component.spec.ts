import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  beforeEach( () => {

    // ANY SERVICES THAT THIS TEST NEEDS
    // TO RUN ARE ADDED IN PROVIDERS
    TestBed.configureTestingModule({

      // Here, we declare the component itself as well as
      // any other components this component uses internally.
      // Because the list is exhasutive, we can just import the
      // CoursesModule.ts file since said module does all
      // importing for us.
      imports: [
        CoursesModule
      ]
    });

  });

  it('should create the component', () => {



  });


  it('should display the course list', () => {

    pending();

  });


  it('should display the first course', () => {

    pending();

  });


});


