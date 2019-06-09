const { getModelItem } = require('./../../helper');
const { getMovies } = require('./../../createBot');

module.exports = [
    {
      out: "hey"
    },
    {
      in: "Hello there! I am Eva, the movie ticket booking bot. How can I help you?",
      out: "I want to buy some tickets"
    },
    {
      in: getModelItem(getMovies, movies => 'What movie would you like to watch?:\n' + movies.join('\n')),
      out: "Rampage movie would be OK"
    },
    {
      in: "How many tickets would you like to book?",
      out: "three",
    },
    {
      in: "Great! I sucessfully booked for you 3 tickets for Rampage movie. Enjoy!"
    }
  ];