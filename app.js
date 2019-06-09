const builder = require('botbuilder');
const restify = require('restify');
const { appId, appPassword, port } = require('./config');
const { createBot } = require("./createBot");

// setup restify server
var server = restify.createServer();
server.listen(port || 3979, () => {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: appId,
    appPassword: appPassword
}); 

server.post('/api/messages', connector.listen());

createBot(connector);