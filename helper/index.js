const { protocol, luisApiHostName, luisAppId, luisApiKey, luisVersionId } = require('../config');
const request = require('request');

/**
 * Get some item from model.
 */
function getModelItem(getter, callback) {
    var endpoint = protocol + '://' + luisApiHostName + '/luis/api/v2.0/apps/'

    // create get request for model
    var luisRequestUrl = endpoint + luisAppId + '/versions/' + luisVersionId + '/models';
    const options = {
        uri: luisRequestUrl,
        headers: {
            'Ocp-Apim-Subscription-Key' : luisApiKey
        }
    };

    request.get(options, (err, response, body) => {
        // HTTP Response
        if (err) {
            console.log('Error getting model item: ' + err);
        }
        else {
            // couldn't fint container APIs for model
            var data = [];
            if (body) {
                data = JSON.parse(body);
            }
            callback(getter(data));
        }
    });    
}

/**
 * Saving data by some API.
 */
function sendData(data) {
    var someSaveApiUrl = 'https://pastebin.com/save';

    request(someSaveApiUrl + '?nrOfTickets=' + data.nrOfTickets + '&movie=' + data.movie, (err, response, body) => {
        // HTTP Response
        if (err) {
            console.log('Error saving data: ' + err);
        }
    });
}

module.exports = { getModelItem, sendData };