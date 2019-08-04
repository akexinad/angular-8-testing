import { fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('Async testing examples', () => {


    it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {

        let test = false;

        setTimeout( () => {

            test = true;

            expect(test).toBeTruthy();

            done();

        }, 1000);

    });

    // FAKE ASYNC TEST UTILITY

    // In angular we use a utility called a ZONE.
    // A zone is, in essence, is a utility an execution
    // context that survives multiples aynchronous operations.
    it('Asynchronous test example - setTimeout()', fakeAsync( () => {

        let test = false;
        let foo = false;
        let bar = false;

        setTimeout( () => {
            foo = true;
        }, 1000);

        setTimeout( () => {
            bar = true;
        }, 1000);


        setTimeout( () => {

            console.log('running assertions setTimeout()');

            test = true;


        }, 1000);

        // fakeAsync() has the ability to allow to control the passage of time by
        // introducing its own version of the setTimeout() function and allowing you
        // to control the passage of time. This is done using the tick() function.

        // the tick() time must be equal to or greater than the time it takes to execute the setTimeout() function.
        // tick(1000);

        // NOTE: If you have multiple async operations, you can call flush() instead of tick() to make sure all of your
        // requests are done before the assertion.
        flush();

        // With tick() or flush() you can now write your assertions in the it() scope and not inside the setTimeout() scope.
        expect(test).toBeTruthy();
        expect(foo).toBeTruthy();
        expect(bar).toBeTruthy();

    }));

    // MICROTASKS
    // A promise would be a good example of a micro-task.
    // In contrast to MACROTASKS/TASKS like setTimeoiut() or other DOM events.
    // MICRO TASKS ARE EXECUTED BEFORE MACRO TASKS.
    it('Asynchronous test example - plain promises', fakeAsync( () => {

        let test = false;

        console.log('creating promise');

        // setTimeout( () => {
        //     console.log('first setTimeout() callback triggered');
        // }, 1000);

        // setTimeout( () => {
        //     console.log('second setTimeout() callback triggered');
        // }, 1000);

        Promise.resolve()
            .then( () => {
                console.log('Promise first then() evaluated successfully');

                return Promise.resolve();
            })
            .then( () => {
                console.log('Promise second then() evaluated successfully');

                test = true;
            });

        console.log('running test assertions');

        // The flushMicrotasks() function will make sure
        // you ONLY FLUSH THE MICROTASKS.
        flushMicrotasks();

        expect(test).toBeTruthy();

    }));

    it('Asynchronous test example - Promises + setTimeout()', fakeAsync( () => {

        let counter = 0;

        Promise.resolve()
            .then( () => {
                counter += 10;

                setTimeout( () => {

                    counter ++;

                }, 1000);
            });

        expect(counter).toBe(0);

        flushMicrotasks();
        expect(counter).toBe(10);

        tick(500);
        expect(counter).toBe(10);

        tick(500);
        expect(counter).toBe(11);
    }));

    it('Asynchronous test example - Observables', fakeAsync( () => {

        let test = false;

        console.log('creating observable');

        const $test = of(test)
            .pipe(
                delay(1000)
            );

        $test.subscribe( () => {
            test = true;
        });

        console.log('Running test assertions');

        tick(1000);
        expect(test).toBe(true);
    }));
});
