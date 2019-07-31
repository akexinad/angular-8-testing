import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe( 'calculator service', () => {

    it('should add two numbers', () => {

        // Arg1 = the name of the service
        // Arg2 = the list of methods found on that service.
        const logger = jasmine.createSpyObj('LoggerService', ['log']);
        // If using the above, there is no need to use the spyOn method.
        // spyOn(logger, 'log');

        const calculator = new CalculatorService(logger);

        const result = calculator.add(2, 2);

        expect(result).toBe(4);

        expect(logger.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {

        const calculator = new CalculatorService( new LoggerService() );

        const result = calculator.subtract(2, 2);

        expect(result).toBe(0);

        // If a test fails for a particular reason, you can add a comment
        // to explain what is going on.

        // expect(result).toBe(0, 'unexpected subtraction result');

    });

});
