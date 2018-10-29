const Controllers = require('../controllers/control');
const Steampay = require('../parser/steampay');

module.exports = app => {

  app.get('/admin', function (req, res) {
    res.render('admin/index');
  });

  app.get('/', function (req, res) {
    res.render('site/index');
  });

	app.post('/createproduct', Controllers.CreateProduct);
  app.put('/updateproduct', Controllers.Updateproduct);
  app.delete('/deleteprodukt/:id', Controllers.Deleteproduct);

  app.get('/findproduct/:cat/:rout', Controllers.FindProduct);
	app.get('/getproduct/:cat/:skip/', Controllers.Getproduct);

  /********ADMIN ROTS*******/
  app.get('/load/product/steampay/:limit', Steampay.LoadALL);
	app.get('/product/parser/GenPayUrl', Steampay.GenPayUrl);
}
