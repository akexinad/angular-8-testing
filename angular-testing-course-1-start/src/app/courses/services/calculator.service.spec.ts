import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

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

        calculator = new CalculatorService(loggerSpy);

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
