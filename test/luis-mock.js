var nock = require('nock');

/**
 * Setting up fake responses for testing inspired by original.
 */
function setup() {
    var model = '/?id=appId&subscription-key=subId&q=';
    nock('https://luis.url')
    .get(model + encodeURIComponent('hey'))
    .reply(200,{
        "query": "hey",
        "topScoringIntent": {
          "intent": "Greet",
          "score": 0.94644177
        },
        "intents": [
          {
            "intent": "Greet",
            "score": 0.94644177
          },
          {
            "intent": "ShowNowPlaying",
            "score": 0.0240955167
          },
          {
            "intent": "None",
            "score": 0.0122513734
          },
          {
            "intent": "BookTicket",
            "score": 0.007015041
          }
        ],
        "entities": []
      })
    .get(model + encodeURIComponent('I want to buy some tickets'))
    .reply(200, {
      "query": "I want to buy some tickets",
      "topScoringIntent": {
        "intent": "BookTicket",
        "score": 0.85551846
      },
      "intents": [
        {
          "intent": "BookTicket",
          "score": 0.85551846
        },
        {
          "intent": "ShowNowPlaying",
          "score": 0.04050871
        },
        {
          "intent": "None",
          "score": 0.01124698
        },
        {
          "intent": "Greet",
          "score": 0.00946742948
        }
      ],
      "entities": []
    })
    .get(model + encodeURIComponent('Rampage movie would be OK'))
    .reply(200, {
      "query": "Rampage movie would be OK",
      "topScoringIntent": {
        "intent": "BookTicket",
        "score": 0.526372731
      },
      "intents": [
        {
          "intent": "BookTicket",
          "score": 0.526372731
        },
        {
          "intent": "ShowNowPlaying",
          "score": 0.0514550954
        },
        {
          "intent": "Greet",
          "score": 0.0239732862
        },
        {
          "intent": "None",
          "score": 0.01356115
        }
      ],
      "entities": [
        {
          "entity": "rampage",
          "type": "Movies",
          "startIndex": 0,
          "endIndex": 6,
          "resolution": {
            "values": [
              "Rampage"
            ]
          }
        }
      ]
    })
    .get(model + encodeURIComponent('three'))
    .reply(200, {
      "query": "three",
      "topScoringIntent": {
        "intent": "Greet",
        "score": 0.7298734
      },
      "intents": [
        {
          "intent": "Greet",
          "score": 0.7298734
        },
        {
          "intent": "ShowNowPlaying",
          "score": 0.04770634
        },
        {
          "intent": "None",
          "score": 0.0172053762
        },
        {
          "intent": "BookTicket",
          "score": 0.0117021045
        }
      ],
      "entities": [
        {
          "entity": "three",
          "type": "builtin.number",
          "startIndex": 0,
          "endIndex": 4,
          "resolution": {
            "subtype": "integer",
            "value": "3"
          }
        }
      ]
    });
}

module.exports = {
  setup
};