var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Article = mongoose.model('Article');
var Comment = mongoose.model('Comment');
var newcom = new Comment({ body: 'nouveua commentaire', });
console.log(newcom.body);

// routes ======================================================================

    // api ---------------------------------------------------------------------
    // recupere tous les articles
    router.get('/blog/articles', function(req, res) 
    {
        // On utilise mongoose pour recup tous les articles dans la DB
        Article.find(function(err, articles) 
        {
            if (err)
            {
                res.send(err);
            }

            res.json(articles); // retourne tous les articles au format JSON
        });
    });

    // créé un article et renvois tous les articles 
    router.post('/blog/articles', function(req, res) 
    {
        // créer un article, on récupere les infos en AJAX depuis Angular
        Article.create(
        {
            title : req.body.title,
            done : false
        }, function(err, todo) 
        {
            if (err)
            {
                res.send(err);
            }

            // récupere et retourne tous les articles après en avoir créer un
            Article.find(function(err, articles) 
            {
                if(err)
                {
                    res.send(err)
                }
                res.json(articles);
            });
        });

    });

//    app.put('/blog/articles/:article_id', function(req, res)
  //  {
   //   Article.
    //})

    // supprime una article
    router.delete('/blog/articles/:article_id', function(req, res) 
    {
        Article.remove(
        {
            _id : req.params.article_id
        }, function(err, article) 
        {
            if(err)
            {
                res.send(err);
            }

            // récupere et retourne tous les articles après en avoir supprimer un
            Article.find(function(err, articles) 
            {
                if(err)
                {
                    res.send(err)
                }
                res.json(articles);
            });
        });
    });

    // route pour créer un commentaire
    router.post('/blog/articles/:article_id/comments', function(req, res) 
    {
        // On utilise mongoose pour recup tous les commentaires dans la DB
        var comment = new Comment(req.body);
        comment.post = req.article_id;
        comment.save(function(err, comment)
        {
            if(err)
            {
                return next(err);
            }

        });
        res.json(comment); // retourne tous les articles au format JSON
    });

    //


// route pour l'appli frontend ==> ANGULAR APP :) 
router.get('*', function(req, res)
{
  res.sendfile('./public/index.html'); // on charge une seule vue ! angular s'occupe d'afficher les changements
});

module.exports = router;