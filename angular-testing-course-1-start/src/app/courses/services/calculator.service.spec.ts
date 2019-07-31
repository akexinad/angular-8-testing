import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe( 'calculator service', () => {

    it('should add two numbers', () => {

        const calculator = new CalculatorService( new LoggerService() );

        const result = calculator.add(2, 2);

        expect(result).toBe(4);
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
