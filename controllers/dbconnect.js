const MongoClient = require('mongodb').MongoClient;
const {mongo:{name, url}} = require('../config');
var db = null;


exports.connect = (done) => {
  if (db) {
    return done();
  }

  MongoClient.connect(url, function(err, database) {
    if (err) {
      return done(err);
    }
    db = database.db(name);
    done();
  })
}

exports.get = () => {
  return db;
}
