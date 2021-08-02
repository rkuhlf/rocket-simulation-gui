
const assert = require('assert');


const data = require('../mainJS/helpers')


describe('Test the helper functions in the code', () => {

    it('Should create three nested objects with a four.', () => {
        assert.deepStrictEqual(data.createObjectFromPath('test1.test2.test3', 4), {
            "test1": {
                "test2": {
                    "test3": 4
                }
            }
        });
    });

});


// TODO: UpdateJSON tests from helpers
// TODO: The rest of the complicated helpers for JSON
// TODO: Look at some examples of tests wit IO involved