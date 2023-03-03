var
    _ = require('lodash'),
    expect = require('chai').expect,
    sinon = require('sinon');

describe("#type", function () {
    beforeEach(function () {
        sinon.spy(console, 'log');
    });

    afterEach(function () {
        console.log.restore();
    });
    var assignment = require('../js/type');
    describe("isArray", function () {
        it('should return true if given Array, otherwise false', function() {
            expect(assignment.isArray([])).to.be.true;
            expect(assignment.isArray({})).to.be.false;
            expect(assignment.isArray(new Date())).to.be.false;
            expect(assignment.isArray(1)).to.be.false;
            expect(assignment.isArray(null)).to.be.false;
            expect(assignment.isArray('a')).to.be.false;
            expect(assignment.isArray(true)).to.be.false;
        });
    });
    
    describe("isObject", function () {
        it('should return true if given Object as collection, otherwise false', function() {
            expect(assignment.isObject({})).to.be.true;
            expect(assignment.isObject([])).to.be.false;
            expect(assignment.isObject(new Date())).to.be.false;
            expect(assignment.isObject(1)).to.be.false;
            expect(assignment.isObject(null)).to.be.false;
            expect(assignment.isObject('a')).to.be.false;
            expect(assignment.isObject(true)).to.be.false;
        });
    });
    
    describe("isCollection", function () {
        it('should return true if given Array or Object as collection, otherwise false', function() {
            expect(assignment.isCollection({})).to.be.true;
            expect(assignment.isCollection([])).to.be.true;
            expect(assignment.isCollection(new Date())).to.be.false;
            expect(assignment.isCollection(1)).to.be.false;
            expect(assignment.isCollection(null)).to.be.false;
            expect(assignment.isCollection('a')).to.be.false;
            expect(assignment.isCollection(true)).to.be.false;
        });
    });
    
    describe('typeOf', function() {
        it('should return a String representing the type of the value provided', function() {
            expect(assignment.typeOf([])).to.equal('array');
            expect(assignment.typeOf('a')).to.equal('string');
            expect(assignment.typeOf(null)).to.equal('null');
            expect(assignment.typeOf(NaN)).to.equal('number');
            expect(assignment.typeOf(1)).to.equal('number');
            expect(assignment.typeOf(new Date())).to.equal('date');
            expect(assignment.typeOf(function () { })).to.equal('function');
        });
    });
});
