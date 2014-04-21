"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var payflow_api = require('../../../');
require('../../configure');

var createRecurringBillingProfile = payflow_api.getModel("createRecurringBillingProfile");

describe('createRecurringBillingProfileModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            //Check parameters
            createRecurringBillingProfile.getParameters().should.be.a('object');

            //Check default parameters
            createRecurringBillingProfile.getDefaultParameters().should.be.a('object');
            createRecurringBillingProfile.getDefaultParameters().should.have.property('TRXTYPE');
            createRecurringBillingProfile.getDefaultParameters().TRXTYPE.should.equal("R");
            createRecurringBillingProfile.getDefaultParameters().should.have.property('TENDER');
            createRecurringBillingProfile.getDefaultParameters().TENDER.should.equal("C");
            createRecurringBillingProfile.getDefaultParameters().should.have.property('ACTION');
            createRecurringBillingProfile.getDefaultParameters().ACTION.should.equal("A");

            //Check validation parameters
            createRecurringBillingProfile.getValidationParameters().should.be.a('array');
            createRecurringBillingProfile.getValidationParameters().should.have.length(9);

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

            var data = {
                TRXTYPE: "R",
                TENDER: "P",
                ACTION: "C",
                AMT: "100",
                EXPDATE: "1118"
            };


            createRecurringBillingProfile.exchangeData(data);
            var params = createRecurringBillingProfile.getParameters();
            params.should.have.property('TRXTYPE');
            params.should.have.property('TENDER');
            params.should.have.property('AMT');
            params.should.have.property('EXPDATE');
            //TRXTYPE and TENDER AND ACTION should be overridden by the model defaults
            params.TRXTYPE.should.equal("R");
            params.TENDER.should.equal("C");
            params.ACTION.should.equal("A");
            params.AMT.should.equal("100");
            params.EXPDATE.should.equal("1118");


        });
    });

    describe('validateData', function () {
        it('Should not throw', function () {
            var data = {
                ACCT: "4716792779006088",
                EXPDATE: "1118",
                CVV2: "111",
                AMT: "100",
                START: "02272014",
                TERM: "0",
                PAYPERIOD: "MONT",
                PROFILENAME: "TEST"
            };
            createRecurringBillingProfile.exchangeData(data);
            expect(createRecurringBillingProfile.validateData).to.not.throw();
        });
        it('Should throw', function () {
            var data = {
                ACCT: "4716792779006088",
                EXPDATE: "1118",
                CVV2: "111",
                AMT: "100",
                START: "02271983",
                TERM: "0",
                PAYPERIOD: "MONT"
            };
            createRecurringBillingProfile.exchangeData(data);
            expect(createRecurringBillingProfile.validateData).to.throw('PROFILENAME: Required parameter for this transaction is undefined');
        });
    });
});

describe('ExecuteCreateRecurringProfile', function () {
    it('Should Return Result 0', function (done) {
        var data = {
            ACCT: "4716792779006088",
            EXPDATE: "1118",
            CVV2: "111",
            AMT: "100",
            START: "02272020",
            TERM: "0",
            PAYPERIOD: "MONT",
            PROFILENAME: "TEST"
        };

        try {
            createRecurringBillingProfile.exchangeData(data);
            createRecurringBillingProfile.validateData();

            payflow_api.execute(createRecurringBillingProfile.getParameters(), function (err, res) {
                if (err) { done(err); }
                res.response.decoded.RESULT.should.equal("0");
                done();
            });

        }
        catch (err)
        {
            console.log(err);
        }
    });
});
