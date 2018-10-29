
module.exports = {
  product: (P, data) => {
   return data({
          "partnerid": P.partnerid,
          "url": P.url,
          "name": P.name,
          "img": P.img,
          "description": P.description,
          "pay": P.pay,
          "prise": P.prise,
          "type": P.type,
          "region": P.region,
          "category": P.category,
          "meta":{
            "keywords": P.meta.keywords,
            "description": P.meta.description
          }
    });
  },
  update: (P, data) => {
    return data({
           "url": P.url,
           "name": P.name,
           "img": P.img,
           "description": P.description,
           "pay": P.pay,
           "prise": P.prise,
           "type": P.type,
           "region": P.region,
           "category": P.category,
           "meta":{
             "keywords": P.meta.keywords,
             "description": P.meta.description
           }
     });
  },
  steampay: (P, data) => {
    return data({
           "url": P.url,
           "name": P.name,
           "img": P.img,
           "description": P.description,
           "pay": P.pay,
           "prise": P.prise,
           "type": P.type,
           "region": P.region,
           "category": P.category,
           "meta":{
             "keywords": P.meta.keywords,
             "description": P.meta.description
           }
     });
  }
}
