var
    _ = require('lodash'),
    expect = require('chai').expect,
    sinon = require('sinon');

describe("#my-first-test", function () {
    beforeEach(function () {
        sinon.spy(console, 'log');
    });

    afterEach(function () {
        console.log.restore();
    });
    var assignment = require('../js/my-first-test');
    
    describe("print", function () {
        it('should log the given value', function() {
            assignment.print('Operation Spark');
            expect(console.log.firstCall.calledWith('Operation Spark')).to.be.true;
            assignment.print('Hello World');
            expect(console.log.secondCall.calledWith('Hello World')).to.be.true;
        });
    });
});
