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

  let component: CoursesCardListComponent;

  // We need a fixture in order to create a instance of a new component.
  let fixture: ComponentFixture<CoursesCardListComponent>;

  let el: DebugElement;

  // since the assignment of the component variable happens asynchronously,
  // we need to invoke the async function the beforeEach block so the first
  // does not fail. It waits exactly 5secs for all operations to be completed.
  // NOTE: This async is not the js async but a specific to angular testing.
  // See the imports, you should have async imported from the testing module.
  beforeEach( async( () => {

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
    })
    .compileComponents()
    .then( () => {

      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;

    });

  }));

  it('should create the component', () => {

    expect(component).toBeTruthy();

  });


  it('should display the course list', () => {

    component.courses = setupCourses();

    // In order to check if the component is loading up 12 cards,
    // we need to tell the test to check for changes within the dom.
    fixture.detectChanges();

    // We can log the changes to the DOM with this line.
    // console.log(el.nativeElement.outerHTML);

    // we want use the debugger to query elements
    // that have a css class ofcourse cards
    const cards = el.queryAll(By.css('.course-card'));

    expect(cards).toBeTruthy('could not find cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses');

  });


  it('should display the first course', () => {

    pending();

  });


});


