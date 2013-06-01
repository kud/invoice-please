var casper = require('casper').create();

var height = 1753,
    width = 1240;

casper.start().viewport(width,height);

casper.thenOpen('http://127.0.0.1:9001/', function() {
    this.capture('dist/invoice.pdf', {
        top: 0,
        left: 0,
        width: width,
        height: height
    });
});

casper.run();