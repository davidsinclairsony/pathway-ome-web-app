var dispatcher = require('./dispatcher');
var EventEmitter = require('./../libs').events.EventEmitter;
var constants = require('./constants');
var assign = require('./../libs').assign;

var CHANGE_EVENT = 'change';