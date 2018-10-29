const db = require('../controllers/dbconnect');
const ObjectId = require('mongodb').ObjectID;
const config = require('../config.json');


module.exports = {
  getproduct: (skip, cb) => {
    var n = Number(skip);
    var limit = 20;
    if(skip == 'all'){
      limit = 0;
      n = 0;
    }
    db.get().collection('product').find().skip(n).limit(limit).toArray(function(err, docs) {
      cb(err, docs);
    })
  },

  getcategory: (skip, category, cb) => {
    var n = Number(skip);
    var limit = 20;
    if(skip == 'all'){
      limit = 0;
      n = 0;
    }
    db.get().collection('product').find({category: category}).skip(n).limit(limit).toArray(function(err, docs) {
      cb(err, docs);
    })
  },

  CreateProduct: (data, cb) => {
    db.get().collection('product').insertOne(data, function(err, docs) {
      cb(err, docs);
    })
  },
  findproduct: (rout, cat, cb) => {
    var routs = { url: rout, category: cat };
    db.get().collection('product').findOne(routs, function(err, docs) {
      //console.log(docs);
      cb(err, docs);
    })
  },
  findinID: (id, cb) => {
    var Fid = { _id: ObjectId(id) };
    db.get().collection('product').findOne(Fid, function(err, docs) {
      //console.log(docs);
      cb(err, docs);
    })
  },
  updateproduct: (id, data, cb) => {
    db.get().collection('product').updateOne({ _id: ObjectId(id) }, { $set: data }, function(err, docs) {
      cb(err, docs);
      console.log("resultresultresult ", docs);
      console.log("errerrerr ", err);
    })
  },
  deleteproduct: (id, cb) => {
    db.get().collection('product').deleteOne({ _id: ObjectId(id) }, function(err, docs) {
      cb(err, docs);
      console.log(err);
    })
  }

}
