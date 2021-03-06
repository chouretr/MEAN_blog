// on créer notre module perso nommé : moduleArticle
var routeApp = angular.module('routeApp', [
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers'
]);

// gere les routes angular
routeApp.config(['$routeProvider',
    function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeCtrl'
        })
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
            redirectTo: '/'
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

        // on recupere un seule article via l'id
            $http.get('/blog/articles/' + id)
                .success(function (data) {
                    $scope.articles = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
            $http.get('/blog/articles/' + id + '/comments')
                .success(function (data) {
                    $scope.comments = data;
                    console.log(data);

                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        $scope.createComment = function () {
            $http.post('/blog/articles/' + id + '/comments', $scope.formData)
                .success(function (data) {
                    //$scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.comments = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

    }
]);

routeAppControllers.controller('homeCtrl', ['$scope', '$http',
    function ($scope, $http) {

        $scope.formData = {};


        // quand on arrive sur la page on affiche tous les articles
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

// fonctionnement : les fonctions interrogent l'api,
//au chargement de la page GET /blog/articles, on lie le résultat en JSON avec le $scope.articles.
// ne reste plus qu'a boucler pour afficher avec angular

routeApp.factory('auth', ['$http', '$window', function($http, $window) {

    var auth = {};

    auth.saveToken = function(token){
        $window.localStorage['flapper-news-token'] = token;
    };

    auth.getToken = function(){
        return $window.localStorage['flapper-news-token'];
    };

    auth.isLoggedIn = function() {
        var token = auth.getToken();

        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return paylod.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.register = function(user){
        return $http.post('/register', user).success(function(data){
            auth.saveToken(data.token);
        });
    };

    auth.logIn = function (user){
        return $http.post('/login', user).success(function(data){
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function(){
        $window.localStorage.removeItem('flapper-news-token');
    };

    return auth;
}]);

