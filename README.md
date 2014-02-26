[![Build Status](https://travis-ci.org/trainerbill/paypal-payflow-sdk.png?branch=master)](https://travis-ci.org/trainerbill/paypal-payflow-sdk)

paypal-payflow-sdk
==================
This SDK is provided "AS-IS" with no warranty. YOU (the developer) would need to ensure that your code works well with your own platform, and that you are handling data securely

Setup
==================
```sh
git clone https://github.com/trainerbill/paypal-payflow-sdk.git
cd paypal-payflow-sdk
npm install
```

Examples
==================
```sh
node examples/DirectPayments/sale.js
node examples/DirectPayments/refund.js
```

Usage
==================
Require SDK
```js
var payflow = require('paypal-payflow-sdk');
```
Use Helper to get Models
```js
var sale = payflow.getModel('sale');
```

Execute API Call.  Send in parameters from helper model
```js
payflow.execute(sale.getParameters(), function(err, data) {
    if (err) {

        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    }
});
```

You can also do a straight execute without using helper functions
```js
var data = {
    TRXTYPE: "S",
    TENDER: "C",
    ACCT: "4556209654007209",
    EXPDATE: "1118",
    CVV2: "111",
    AMT: "100"
};

payflow_api.execute(data, function (err, res) {
    if (err) { done(err); }
    expect(err).equal(null);
    expect(res.RESULT).equal("0");
    done();
});
```
Running Tests
==================
All Tests and Build
```sh
grunt
```
All Tests
```sh
mocha --recursive -t 60000
```
One Test
```sh
mocha -t 60000 test/src/Directpayments/sale.js
```



Contribution
==================
If you would like to contribute, please fork the repo and send in a pull request.  Please run grunt before submitting.