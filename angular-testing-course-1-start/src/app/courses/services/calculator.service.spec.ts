import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';

// DISABLING TESTS

// TO DISABLE THE ENTIRE TEXT SUITE, JUST ADD AN x INFRONT OF DESCRIBE OR
// INFRONT OF ANY PARTICULAR TEST, WITH NO SPACE.

// If you want to focus on one particular test suite and by pass all the
// others, just add an f infront of the describe method
describe( 'calculator service', () => {

    // Define calculator up hear so it is thus available in every block.
    let calculator: CalculatorService;
    let loggerSpy: any = null;

    // To avoid repeating yourself and creating the same instance of
    // the logger sevice in every test, we can run the beforeEach() function.

    beforeEach( () => {

        // JASMINE SPY
        // Arg1 = the name of the service
        // Arg2 = the list of methods found on that service.
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        // If using the above, there is no need to use the spyOn method.
        // spyOn(logger, 'log');

        // DEPENDENCY INJECTIONS
        // Instead of creating instances of every service dependency injection,
        // we will create a TestBed() to provide our services.
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                // In the case using spies, we provide an object with these values:
                {
                    provide: LoggerService,
                    useValue: loggerSpy
                }
            ]
        });

        // Now with this test bed, we do not need to instanitate the caluclator service
        // calculator = new CalculatorService(loggerSpy);

        // instead we call:
        calculator = TestBed.get(CalculatorService);

    });

    it('should add two numbers', () => {

        const result = calculator.add(2, 2);

        expect(result).toBe(4);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);

    });

    it('should subtract two numbers', () => {

        const result = calculator.subtract(2, 2);

        expect(result).toBe(0);

        // If a test fails for a particular reason, you can add a comment
        // to explain what is going on.

        // expect(result).toBe(0, 'unexpected subtraction result');

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);

    });

});
