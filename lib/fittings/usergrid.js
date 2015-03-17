/****************************************************************************
 The MIT License (MIT)

 Copyright (c) 2015 Apigee Corporation

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
'use strict';

var debug = require('debug')('pipes');
var _ = require('lodash');
var Http = require('machinepack-http');
var Url = require('url');

// defaults output -> url
module.exports = function create(fittingDef) {

  var config = fittingDef.config;

  var baseUri = Url.resolve(config.baseUri, config.organization, config.application);
  var accessToken = config.access_token;

  //clientId: configured
  //clientSecret: configured


  var config = _.extend({ baseUrl: '' }, fittingDef.config);

  return function http(context, cb) {

    var input = (typeof context.input === 'string') ? { url: context.input } : context.input;

    var options = _.extend({ url: context.output }, input, config);

    Http.sendHttpRequest(options, cb);
  }
};

/* input:
 url: '/pets/18',
 baseUrl: 'http://google.com',
 method: 'get',
 params: {},
 headers: {}
 */