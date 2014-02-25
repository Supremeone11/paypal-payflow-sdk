/**
 * Created by athroener on 2/21/14.
 */
"use strict";

var http = require('http');
var https = require('https');
var querystring = require('querystring');
var _ = require('underscore');
//var uuid = require('node-uuid');

module.exports = function () {
	var sdk_version = '0.6.4';
	//var user_agent = 'PayPalSDK/paypal-payflow-sdk ' + sdk_version + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + ')';
	var default_options = {
	    'schema': 'https',
	    'host': 'payflowpro.paypal.com',
	    'headers': {'Content-Type': 'application/x-www-form-urlencoded'}
    };

    function configure(options) {
        default_options =  _.extend(default_options, options);
    }

    function executeHttp(data,cb) {
        var error = null;
        var query = default_options.credentials;
        _.extend(query,data);

        var string = querystring.stringify(query);

        var options = {
            hostname: default_options.host,
            port: 443,
            method:'POST',
            headers: _.extend(default_options.headers,{'Content-Length':string.length})
        };

        var req = https.request(options,function(res){
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;

            });
            res.on('end', function () {
                //console.log(querystring.parse(body));
                cb(error,querystring.parse(body));
            });
        });
        req.end(string);
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            cb(e,null);
        });

    }

    return {
        version: sdk_version,
        configure: function (options) {
            configure(options);
        },

        execute:   function(data,cb){
            executeHttp(data,cb)
        },

        sale: function(data,cb){

            executeHttp(data,cb)
        },

        getModel: function(model){

            switch(model)
            {
                case "sale":
                    return require('../models/DirectPayments/sale')();
                break;

                case "authorization":
                    return require('../models/DirectPayments/authorization')();
                break;

                case "capture":
                    return require('../models/DirectPayments/capture')();
                break;

                case "reference":
                    return require('../models/DirectPayments/reference')();
                break;

                case "refund":
                    return require('../models/DirectPayments/refund')();
                break;

                case "void":
                    return require('../models/DirectPayments/void')();
                break;

                default:
                    throw model+":Model not defined."
                break;
            }

        }
    };
};