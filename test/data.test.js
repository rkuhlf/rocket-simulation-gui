// I have never had a great feel for where you should add a test or not
// This is basically just some random things that I needed to make sure they worked in a vacuum

const assert = require('assert');


// Make sure that all of the data processing is working perfectly
const data = require('../mainJS/data')


describe('Test the data processing aspects of the code', () => {
    console.log(data.createObjectFromPath('test1.test2.test3', 4))
    it('Should create three nested objects with a four.', () => {
        assert.deepStrictEqual(data.createObjectFromPath('test1.test2.test3', 4), {
            "test1": {
                "test2": {
                    "test3": 4
                }
            }
        });
    });

    // TODO: Add tests for updateCurrentSImulation
});

