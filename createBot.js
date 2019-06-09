const { protocol, luisApiHostName, luisAppId, luisApiKey, cosmosdbHostName, masterKey, database, collection } = require('./config');
const builder = require('botbuilder');
const azure = require('botbuilder-azure'); 
const { getModelItem, sendData } = require('./helper');
const luisModelUrl = protocol + '://' + luisApiHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisApiKey;
const documentDbOptions = {
    host: protocol + '://' + cosmosdbHostName,
    masterKey: masterKey,
    database: database,
    collection: collection
};

/**
 * Function for getting movies list from model json.
 */
const movies = ['Avengers', 'Jurassic world', 'Rampage', 'The Incredibles 2', 'Obchod na Korze'];
const getMovies = data => data.length == 0 ? movies : data.filter(item => item.name == 'Movies')[0].subLists.map(subList => subList.canonicalForm);

const createBot = (connector) => {
    var bot = new builder.UniversalBot(connector);
    if (process.env.NODE_ENV === 'production') {
        // saving state data to CosmosDB
        var docDbClient = new azure.DocumentDbClient(documentDbOptions);
        var tableStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

        bot = bot.set('storage', tableStorage);;
    }

    var recognizer = new builder.LuisRecognizer(luisModelUrl);
    var intents = new builder.IntentDialog({
        recognizers: [recognizer]
    });

    // connect IntentDialog and UniversalBot object
    bot.dialog('/', intents);

    // handlers for intents
    intents.matches('Greet', (session, args, next) => {
        session.send('Hello there! I am Eva, the movie ticket booking bot. How can I help you?');
    });

    intents.matches('ShowNowPlaying', (session, args, next) => {
        session.sendTyping();
        getModelItem(getMovies, movies => session.send('Here is the list of movies currently playing:\n' + movies.join('\n')));
    });

    intents.matches('BookTicket', [(session, args, next) => {
        var movieEntity = args.entities.filter(ent => ent.type == 'Movies');
        var nrOfTicketsEntity = args.entities.filter(ent => ent.type == 'builtin.number');

        if (movieEntity.length > 0) {
            session.userData.movie = movieEntity[0].resolution.values[0];
        }
        else {
            delete session.userData.movie;
        }

        if (nrOfTicketsEntity.length > 0) {
            session.userData.nrOfTickets = nrOfTicketsEntity[0].resolution.value;
        }
        else {
            delete session.userData.nrOfTickets;
        }

        if (!session.userData.movie) {
            session.beginDialog('askMovie');
        }
        else {
            next();
        }
    }, (session, args, next) => {
        if (!session.userData.nrOfTickets) {
            session.beginDialog('askNrOfTickets');
        }
        else {
            next();
        }
    }, (session, args, next) => {
        session.send('Great! I sucessfully booked for you ' + session.userData.nrOfTickets + ' tickets for ' + session.userData.movie + ' movie. Enjoy!');
        sendData(session.userData);
    }]);

    // dialogs for specifying entities
    bot.dialog('askMovie', [(session, args, next) => {
        getModelItem(getMovies, movies => builder.Prompts.choice(session, "What movie would you like to watch?", movies));
    }, (session, results) => {
        session.userData.movie = results.response.entity;
        session.endDialogWithResult(results);
    }]);

    bot.dialog('askNrOfTickets', [(session, args, next) => {
        builder.Prompts.number(session, "How many tickets would you like to book?");
    }, (session, results) => {
        session.userData.nrOfTickets = results.response;
        session.endDialogWithResult(results);
    }]);


    return bot;
};

module.exports = { luisModelUrl, createBot, getMovies };