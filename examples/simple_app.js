'use strict';

const express = require('express');

const RouteList = require('../lib');
const ConsoleFormatter = require('../lib/formatters/ConsoleFormatter');

const app = express();

app.use(function(req, res, next) {
    console.log('cb1');
    next();
});

app.use(function(req, res, next) {
    console.log('cb2');
    next();
});

app.get('/', function(req, res) {
    console.log('cb3');
    res.end();
}, function(req, res) {
    console.log('cd4');
    res.end();
});

app.get('/chat/:id', function(req, res) {
    console.log('cb4');
    res.end();
});

app.post('/chat', function(req, res) {
    console.log('cd5');
    res.end();
});

const formatter = new ConsoleFormatter();
const routeList = new RouteList(app, formatter);

routeList.report();
