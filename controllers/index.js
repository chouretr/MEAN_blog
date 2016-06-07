var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var router = express.Router();
var User = mongoose.model('User');
var auth = jwt({secret: 'SECRET', userproperty: 'payload'});

// Creer un utilisateur
router.post('/register', function(req, res, next) {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({message: 'Veuillez remplir tous les champs'});
    }

    var user = new User();

    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        if(err){ return next(err); }

        return res.json({token: user.generateJWT()})
    });
});

router.post('/login', function (req, res, next) {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({message: 'Veuillez remplir tous les champs'});
    }
    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }
        if(user){
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
