const express      = require('express');
const createError  = require('http-errors');
const BodyPparser  = require('body-parser');
const routes       = require('./server/routes');
const db           = require('./controllers/dbconnect');
const path 				 = require('path');
const cors         = require('cors');
const port = process.env.PORT || 2000;


const app = express();
app.use(cors());
app.use(BodyPparser.json());
app.use(BodyPparser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

routes(app);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
	res.render('error', {error: '404' });
});


db.connect((err) => {
    if(err){
      return console.log(err);
    }
    app.listen(port, function () {
      console.log(`API Started ${port}`);
   })
})
