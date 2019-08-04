import { fakeAsync, tick, flush } from '@angular/core/testing';

fdescribe('Async testing examples', () => {


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

        // With tick() you can now write your assertions in the it() scope and not inside the setTimeout() scope.
        expect(test).toBeTruthy();
        expect(foo).toBeTruthy();
        expect(bar).toBeTruthy();

    }));
});
