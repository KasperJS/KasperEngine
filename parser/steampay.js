const axios = require('axios');
const utility = require('./utility');
const Cheme = require('../controllers/dbcheme');
const Models = require('../models/models');

module.exports = {
  LoadALL: (req, res) => {
    var limit = req.params.limit;
    var coll = 0;
    axios.get('https://steampay.com/api/products')
     .then(function(products) {
      products = products.data.products;
      if (limit == 0) {
        limit = products.length;
      }
      var i = 0;
      var Start = () => {
        if (i < limit) {
          var img = `/games/poster/Pay-Play${products[i].image.split('goods/')[1]}`;
          var item = {
            "partnerid": products[i].id,
            "url": utility.GenURL(products[i].title),
            "name": products[i].title,
            "img": img, //`/games/poster/Pay-Play-games${products[i].title.replace(/'| /gi, "-");)}.jpg`,
            "description": 'description description',
            "pay": 'none',
            "prise": products[i].prices,
            "type": products[i].activation,
            "region": 'none',
            "category": products[i].activation,
            "meta": {
              "keywords": 'non keywords',
              "description": 'non description'
            }
          };
          utility.LoadImg(products[i].image);
          Create(item);
          console.log("ДОБАВЛЕННО : ", i);
          i++;
        } else {
          clearInterval(ParsingTimer);
           console.log('Закончили');
        }
      }
    var ParsingTimer = setInterval(function() {
        Start()
      }, 100);
    })
    res.send(200, {"Loaded": limit});
  },
  GenPayUrl: (req, res) => {
    Models.getproduct('all', function (err, docs) {
      if(err){
        return res.send(300, {err})
      }else {
        var i = 0;
        var limit = docs.length;
        var Start = () => {
          if(i < limit){
            STARTGenPayurl(docs[i]._id, docs[i].partnerid);
            console.log(i);
            i++;
          }else {
            clearInterval(StartTimer);
            console.log('GenPayUrl: DONE');
          }
        }
        var StartTimer = setInterval(function() {
            Start()
          }, 100);
        res.send(200, {"status": "OK", "colv": docs.length})
      }
    })
  }
};

////////////////////////////////////////////////////////

getAll = (cb) => {
  axios.get('https://steampay.com/api/products').then(function(val) {
    cb(val.data);
  })
};

Create = (item) => {
  Cheme.product(item, (data) => {
    Models.CreateProduct(data, (err, docs) => {
      if (err) {
        return err;
      }
      return 'OK';
    })
  })
};

getPayURL = (id) => {
  utility.GenPayurl(id, (url) => {
    return url;
  })
}

STARTGenPayurl = (id, pid, date) => {
    utility.GenPayurl(pid, function(url, lang) {
      var date = {pay: url, region: lang};
      Models.updateproduct(id, date, function(result) {
        console.log(result);
      })
    })
}
//
// gameInfo: (id, cb) => {
//   axios.get(`https://steampay.com/api/product/${id}`)
//   .then(function(val) {
//       cb(val.data.products);
//   })
// },
// SaveDB: (P) => {
//   let params = {
//         "url": utility.GenURL(P.title),
//         "name": utility.LoadImg(P.image),
//         "img":`/games/poster/${urlimg}`,
//         "description": P.description,
//         "pay": P.pay,
//         "prise": P.prise,
//         "type": P.type,
//         "region": P.region,
//         "category": P.category,
//         "meta":{
//           "keywords": P.meta.keywords,
//             "description": P.meta.description
//           }
//         };
//   cheme.product(params, (data) => {
//     console.log(data);
//   })
// }
