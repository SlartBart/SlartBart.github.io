var _ = require('lodash'),
  expect = require('chai').expect,
  sinon = require('sinon');

describe('#loops', function() {
  beforeEach(function() {
    sinon.spy(console, 'log');
  });

  afterEach(function() {
    console.log.restore();
  });
  var assignment = require('../js/loops');
  var array = [1, 2, 3];
  var arrayTwo = ['one', 'two', 'three', 'four'];
  var object = { one: 'one', two: 'two', three: 'three' };
  var objectTwo = { one: 1, two: 2, three: 3, four: 4 };
  describe('printArrayValues()', function() {
    it('should call log with the values in the Array', function() {
      assignment.printArrayValues(array);
      expect(console.log.firstCall.calledWith(1)).to.be.true;
      expect(console.log.secondCall.calledWith(2)).to.be.true;
      expect(console.log.thirdCall.calledWith(3)).to.be.true;
      
      console.log.reset();
      
      assignment.printArrayValues(arrayTwo);
      expect(console.log.firstCall.calledWith('one')).to.be.true;
      expect(console.log.secondCall.calledWith('two')).to.be.true;
      expect(console.log.thirdCall.calledWith('three')).to.be.true;
    });
  });

  describe('printArrayValuesInReverse()', function() {
    it('should call log with the values in the Array in reverse order', function() {
      assignment.printArrayValuesInReverse(array);
      expect(console.log.firstCall.calledWith(3)).to.be.true;
      expect(console.log.secondCall.calledWith(2)).to.be.true;
      expect(console.log.thirdCall.calledWith(1)).to.be.true;
      
      console.log.reset();
        
      assignment.printArrayValuesInReverse(arrayTwo);
      expect(console.log.firstCall.calledWith('four')).to.be.true;
      expect(console.log.secondCall.calledWith('three')).to.be.true;
      expect(console.log.thirdCall.calledWith('two')).to.be.true;
    });
  });

  describe('getObjectKeys()', function() {
    it('should return an Array containing the Object keys', function() {
      expect(assignment.getObjectKeys(object)).to.eql(['one', 'two', 'three']);
      expect(assignment.getObjectKeys(objectTwo)).to.eql(['one', 'two', 'three', 'four']);
    });
  });

  describe('printObjectKeys()', function() {
    it('should call log with the keys in the Object', function() {
      assignment.printObjectKeys(object);
      expect(console.log.firstCall.calledWith('one')).to.be.true;
      expect(console.log.secondCall.calledWith('two')).to.be.true;
      expect(console.log.thirdCall.calledWith('three')).to.be.true;
      
      console.log.reset();
      
      assignment.printObjectKeys(objectTwo);
      expect(console.log.firstCall.calledWith('one')).to.be.true;
      expect(console.log.secondCall.calledWith('two')).to.be.true;
      expect(console.log.thirdCall.calledWith('three')).to.be.true;
    });
  });
  
  describe('getObjectValues()', function () {
        it('should return an Array containing the Object values', function () {
            expect(assignment.getObjectValues(object)).to.eql(['one', 'two', 'three']);
            expect(assignment.getObjectValues(objectTwo)).to.eql([1, 2, 3, 4]);
        });
    });

  describe('printObjectValues()', function() {
    it('should call log with the values in the Object', function() {
      assignment.printObjectValues(object);
      expect(console.log.firstCall.calledWith('one')).to.be.true;
      expect(console.log.secondCall.calledWith('two')).to.be.true;
      expect(console.log.thirdCall.calledWith('three')).to.be.true;
      
      console.log.reset();
      
      assignment.printObjectValues(objectTwo);
      expect(console.log.firstCall.calledWith(1)).to.be.true;
      expect(console.log.secondCall.calledWith(2)).to.be.true;
      expect(console.log.thirdCall.calledWith(3)).to.be.true;
    });
  });

  describe('getObjectLength()', function() {
    it('should return the number of key/value pairs in the Object', function() {
      expect(assignment.getObjectLength(object)).to.equal(3);
    
      expect(assignment.getObjectLength(objectTwo)).to.equal(4);
    });
  });

  describe('printObjectValuesInReverse()', function() {
    it('should call log with the values in the Object in reverse order', function() {
      assignment.printObjectValuesInReverse(object);
      expect(console.log.firstCall.calledWith('three')).to.be.true;
      expect(console.log.secondCall.calledWith('two')).to.be.true;
      expect(console.log.thirdCall.calledWith('one')).to.be.true;
      
      console.log.reset();
    
      assignment.printObjectValuesInReverse(objectTwo);
      expect(console.log.firstCall.calledWith(4)).to.be.true;
      expect(console.log.secondCall.calledWith(3)).to.be.true;
      expect(console.log.thirdCall.calledWith(2)).to.be.true;
    });
  });
});
