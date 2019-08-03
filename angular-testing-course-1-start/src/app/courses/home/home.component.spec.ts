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
  const advancedCourses = setupCourses().filter( course => course.category === 'ADVANCED' );

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
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toEqual(1, 'Unexpected number of tabs found.');

  });


  it('should display only advanced courses', () => {

    // The courses sevice expects to return an observable, not an array of courses.
    // thus we wrap the beginnerCourses variable in an rx/js of() method.
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    // detects the changes as well applies the changes to the dom.
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toEqual(1, 'Unexpected number of tabs found.');

  });


  it('should display both tabs', () => {

    // The courses sevice expects to return an observable, not an array of courses.
    // thus we wrap the beginnerCourses variable in an rx/js of() method.
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    // detects the changes as well applies the changes to the dom.
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toEqual(2, 'Expected to find 2 tabs');

  });


  it('should display advanced courses when tab clicked', (done: DoneFn) => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    // This simulates a click.
    // el.nativeElement.click();

    // However, instead of using the expression above, we will use the
    // click()  utility function and pass in the advanced tab button.
    click(tabs[1]);

    fixture.detectChanges();

    // The DOM utilizes the requestAnimationFrameRate() function native to JS.
    // So basically we need to give the test a moment to click the button.
    // a setTimeout of 500ms should do it.
    // along with passing in the done function to tell jasmine the test was completed
    // since the expect() method cannot access the execution context of the it() method.
    setTimeout( () => {

      const cardTitles = el.queryAll(By.css('.mat-card-title'));

      expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');
      expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');

      done();

    }, 500);

  });

});


