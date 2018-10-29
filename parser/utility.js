const Axios  = require('axios');
const fs 		 = require('fs');
const Path 	 = require('path');
const Config = require('../config.json');

module.exports = {
    LoadImg: async (img) => {
      var imgName = img.split('goods/')[1];
        await Axios({
            method:'get',
            url:img,
            responseType:'stream'
          })
            .then(function(response) {
              response.data.pipe(fs.createWriteStream(`./public/img/games/poster/Pay-Play${imgName}`))
            });

    },
//C:\Users\KASPER\Documents\PROJEKT\KE\KEN\public\img\games\poster
    GenURL: (name) => {
      var url = name.replace(/'|:| /gi, "-");
      return url;
    },

    GenPayurl: function (id, cb) {
      var val, url;
      Axios.get(`https://steampay.com/api/product/${id}`)
      .then((val) => {
        var tmp = val.data.product;
          url = `https://www.oplata.info/asp2/pay_wm.asp?id_d=${tmp.id_digi}&id_po=0&cart_uid=&ai=${Config.parser.steampayaid}&curr=RUB&failpage=https%3A%2F%2Fsteampay%2Ecom&lang=ru-RU&nocash=667633&_ow=&_ids_shop=`;
          return cb(url, tmp.language);
        })
        .catch(function (error) {
           console.log(error);
        });
    }
}
