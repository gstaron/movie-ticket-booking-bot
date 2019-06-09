var builder = require('botbuilder');

var common = require('./common');
var luisMock = require('./luis-mock');
var testBot = require('../createBot');
var messages = require('./dialog-flows');

luisMock.setup();

//Our parent block
describe('Bot Tests', () => {
  // example test, more should be added to cover the bot (to dialog-flows and luis-mock.js)
  it('standard booking', done => {
    var connector = new builder.ConsoleConnector();
    var bot = testBot.createBot(connector);

    common.testBot(bot, messages, done);
  });

});