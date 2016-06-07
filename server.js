var express = require('express');
var app = express();                            // créé notre application
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');             
var Article = require('./models/article.js');
var methodOverride = require('method-override'); // simule des DELETE et PUT

// configuration de notre application
app.use(express.static(__dirname + '/public'));                 // emplacement des fichiers statiques
app.use(passport.initialize());
app.use(morgan('dev'));                                         // log pour chaque requete sur la console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json en json
app.use(methodOverride());

// on écoutera sur le port 3000 ou 8080
var port = process.env.PORT || 8080;

require('./models/article.js'); // on charge le modele de l'article
require('./models/comments.js'); // on charge le modele de
require('./models/users'); // model users avec les méthodes d'authentification
require('./config/passport'); // configuration de passport

var routes = require('./controllers/article');
var routes2 = require('./controllers/index');
app.use('/', routes);
app.use('/', routes2);

// CONNECTION A LA DB & DEMARAGE DU SERVER
mongoose.connect('mongodb://admin:password@ds011291.mlab.com:11291/mean_blog', function(err, database) 
{
  if(err)
  {
    return console.log(err);
  }
  app.listen(port, function() 
  {
  console.log('listening on port' + port)
  });
});

