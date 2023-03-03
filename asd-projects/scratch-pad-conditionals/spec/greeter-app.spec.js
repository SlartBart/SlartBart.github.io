describe("#greeter-app", function () {
    beforeEach(function () {
        sinon.spy(console, 'log');
    });

    afterEach(function () {
        console.log.restore();
    });

    it('should print the correct message depending on the time of day', function () {
        greeter(0);
        expect(console.log.firstCall.calledWith('Good Morning!'), 'should print Good Morning! if hour is between 0 and 11').to.be.true;
        greeter(11);
        expect(console.log.secondCall.calledWith('Good Morning!'), 'should print Good Morning! if hour is between 0 and 11').to.be.true;
        greeter(12);
        expect(console.log.thirdCall.calledWith('Good Morning!'), 'should print Good Morning! if hour is between 0 and 11').to.be.false;
    
        console.log.reset();
        
        greeter(12);
        expect(console.log.firstCall.calledWith('Good Afternoon!'), 'should print Good Afternoon! if hour is between 12 and 16').to.be.true;
        greeter(16);
        expect(console.log.secondCall.calledWith('Good Afternoon!'), 'should print Good Afternoon! if hour is between 12 and 16').to.be.true;
        greeter(17);
        expect(console.log.thirdCall.calledWith('Good Afternoon!'), 'should print Good Afternoon! if hour is between 12 and 16').to.be.false;
        
        console.log.reset();
        
        greeter(17);
        expect(console.log.firstCall.calledWith('Good Evening!'), 'should print Good Evening! if hour is between 17 and 21').to.be.true;
        greeter(21);
        expect(console.log.secondCall.calledWith('Good Evening!'), 'should print Good Evening! if hour is between 17 and 21').to.be.true;
        greeter(22);
        expect(console.log.thirdCall.calledWith('Good Evening!'), 'should print Good Evening! if hour is between 17 and 21').to.be.false;
   
        console.log.reset();
        
        greeter(22);
        expect(console.log.firstCall.calledWith('Good Night!'), 'should print Good Night! if hour is between 22 and 23').to.be.true;
        greeter(23);
        expect(console.log.secondCall.calledWith('Good Night!'), 'should print Good Night! if hour is between 22 and 23').to.be.true;
        greeter(0);
        expect(console.log.thirdCall.calledWith('Good Night!'), 'should print Good Night! if hour is between 22 and 23').to.be.false;
    });
});
