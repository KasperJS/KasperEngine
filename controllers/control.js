const Models = require('../models/models');
const Cheme = require('../controllers/dbcheme');

module.exports = {
  Getproduct: (req, res) => {
   if(req.params.cat != "all"){
     Models.getcategory(req.params.skip, req.params.cat, (err, docs) => {
       if (err) {
         return err;
       }
       res.json(docs);
     });
   }else {
     Models.getproduct(req.params.skip, (err, docs) => {
       if (err) {
         return err;
       }
       res.json(docs);
     })
   }
  },
  CreateProduct: (req, res) => {
    Cheme.product(req.body.data, (data) => {
      Models.CreateProduct(data, (err, docs) => {
          if(err){
            return err;
          }
          res.send('OK');
      })
    })
  },
  FindProduct: (req, res) => {
    console.log("req.params.rout**+++ ", req.params.rout);
    console.log("req.params.routcat ", req.params.cat);
    Models.findproduct(req.params.rout, req.params.cat, (err, docs) => {
      if(err){
        return err;
      }
      res.send(docs);
    })
  },
  Updateproduct: (req, res) => {
    Cheme.update(req.body.data, (data) => {
      Models.updateproduct(req.body.data._id, data, (err, result) => {
        if(err){
          return err;
        }
        console.log("resultresult ", result);
        res.send(result);
      })
    })
  },
  Deleteproduct : (req, res) => {
    console.log(req.params.id);
    Models.deleteproduct(req.params.id, (err, result) => {
      if(err){
        return err;
      }
      res.send(result);
    })
  }
}
