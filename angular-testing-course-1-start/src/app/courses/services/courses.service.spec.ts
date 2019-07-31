import { CoursesService } from "./courses.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";

describe('Courses Service', () => {

    let coursesService: CoursesService;
    let httpTestingController: HttpTestingController;

    beforeEach( () => {

        TestBed.configureTestingModule({
            // We would want to provide a mock implementation of an http client
            // because we do not want the test to make real http requests.
            imports: [
                HttpClientModule
            ],
            providers: [
                CoursesService
            ]
        });

        coursesService = TestBed.get(CoursesService);
        httpTestingController = TestBed.get(HttpTestingController);

    });

    it('shoulde retrieve all courses', () => {

    });

});
