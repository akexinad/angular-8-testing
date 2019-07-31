import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from '../../../../server/db-data';
import { Course } from '../model/course';

describe('Courses Service', () => {

    let coursesService: CoursesService;
    let httpTestingController: HttpTestingController;
    const changes: Partial<Course> = {
        titles: {
            description: 'Testing Course'
        }
    };

    beforeEach( () => {

        TestBed.configureTestingModule({
            // We would want to provide a mock implementation of an http client
            // because we do not want the test to make real http requests.
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                CoursesService
            ]
        });

        coursesService = TestBed.get(CoursesService);
        httpTestingController = TestBed.get(HttpTestingController);

    });

    it('should retrieve all courses', () => {

        coursesService.findAllCourses()
            .subscribe( courses => {

                expect(courses).toBeTruthy('No courses returned');

                expect(courses.length).toBe(12, 'Incorrect number of courses');

                const course = courses.find( course => course.id === 12);

                expect(course.titles.description).toBe(
                    'Angular Testing Course'
                );
            });

        const req = httpTestingController.expectOne('/api/courses');

        expect(req.request.method).toEqual('GET');

        // What you're expecting the GET request to return.
        req.flush({
            payload: Object.values(COURSES)
        });

    });

    it('should find a course by id', () => {

        coursesService.findCourseById(12)
            .subscribe( course => {

                expect(course).toBeTruthy();
                expect(course.id).toBe(12);

            });

        const req = httpTestingController.expectOne('/api/courses/12');

        expect(req.request.method).toEqual('GET');

        req.flush( COURSES[12] );

    });

    it('should save the course data', () => {

        coursesService.saveCourse(12, changes)
            .subscribe( course => {

                expect(course.id).toBe(12);

            });

        const req = httpTestingController.expectOne('/api/courses/12');

        expect(req.request.method).toEqual('PUT');

        expect(req.request.body.titles.description).toEqual(changes.titles.description);

        // The put request returns the course WITH THE CHANGES.
        req.flush({
            ...COURSES[12],
            ...changes
        });

    });


    afterEach( () => {

        // To verify that the http request is only being made once.
        httpTestingController.verify();

    });


});
