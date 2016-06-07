// on créer notre module perso nommé : moduleArticle
var moduleArticle = angular.module('moduleArticle', []);

/* on créer un controlleur et 3 fonctions
1 - récupérer tous les articles
2 - créer un article
3 - supprimer un article
*/
function mainController($scope, $http) 
{
    $scope.formData = {};

    // quand on arrive sur la page :on affiche tous les articles
    $http.get('/blog/articles')
        .success(function(data) 
        {
            $scope.articles = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // quand on soumet un formulaire, on envoi le text à l'API
    $scope.createArticle = function() 
    {
        $http.post('/blog/articles', $scope.formData)
            .success(function(data) 
            {
                //$scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.articles = data;
                console.log(data);
            })
            .error(function(data) 
            {
                console.log('Error: ' + data);
            });
    };

    // supprime un article après vérification
    $scope.deleteArticle = function(id) 
    {
        $http.delete('/blog/articles/' + id)
            .success(function(data) 
            {
                $scope.articles = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}

// fonctionnement : les fonctions interrogent l'api, 
//au chargement de la page GET /blog/articles, on lie le résultat en JSON avec le $scope.articles.
// ne reste plus qu'a boucler pour afficher avec angular