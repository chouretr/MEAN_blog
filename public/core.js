// on créer notre module perso nommé : moduleArticle
var routeApp = angular.module('routeApp', [
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers'
]);

// gere les routes angulard
routeApp.config(['$routeProvider',
    function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'homeCtrl'
        })
        .when('/administration', {
            templateUrl: 'pages/administration.html',
            controller: 'adminCtrl'
        })
        .when('/articles/:id', {
            templateUrl: 'pages/article.html',
            controller: 'articleCtrl'
        })
        .otherwise({
            redirectTo: 'pages/home.html'
        });
    }
]);

var routeAppControllers = angular.module('routeAppControllers', []);

/* on créer un controlleur et 3 fonctions
1 - récupérer tous les articles
2 - créer un article
3 - supprimer un article
*/

routeAppControllers.controller('adminCtrl', ['$scope',
    function($scope){
        $scope.message = "Salut";
    }
]);

routeAppControllers.controller('articleCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams){
        $scope.formData = {};
        var id = $routeParams.id;

        // quand on arrive sur la page :on affiche tous les articles
            $http.get('/blog/articles/' + id)
                .success(function (data) {
                    $scope.articles = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

    }
]);

routeAppControllers.controller('homeCtrl', ['$scope', '$http',
    function ($scope, $http) {

        $scope.formData = {};


        // quand on arrive sur la page :on affiche tous les articles
        $http.get('/blog/articles')
            .success(function (data) {
                $scope.articles = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        // quand on soumet un formulaire, on envoi le text à l'API
        $scope.createArticle = function () {
            $http.post('/blog/articles', $scope.formData)
                .success(function (data) {
                    //$scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.articles = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        // supprime un article après vérification
        $scope.deleteArticle = function (id) {
            $http.delete('/blog/articles/' + id)
                .success(function (data) {
                    $scope.articles = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
    }
]);


/*moduleArticle.controller('mainController', function ($scope, $http)
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
});

moduleArticle.controller('administrationController', function($scope)
{
    console.log('salut');
    $scope.message = "Page d\'administration.";
});

moduleArticle.controller('articleController', function($scope)
{
    $scope.message = 'Page d un article.';
});*/

// fonctionnement : les fonctions interrogent l'api,
//au chargement de la page GET /blog/articles, on lie le résultat en JSON avec le $scope.articles.
// ne reste plus qu'a boucler pour afficher avec angular