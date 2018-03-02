'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngMaterial',
  'ui.router'
]).
run(function($rootScope){
  $rootScope.cards = [
    {
      "id": 1,
      "title": "Action Title",
      "description": "The titles of Washed Out's breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well..."
    },
    {
      "id":2,
      "title": "Action Title",
      "description": "The titles of Washed Out's breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well..."
    },
    {
      "id":3,
      "title": "Action Title",
      "description": "The titles of Washed Out's breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well..."
    },
    {
      "id":4,
      "title": "Action Title",
      "description": "The titles of Washed Out's breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well..."
    },
    {
      "id":5,
      "title": "Action Title",
      "description": "The titles of Washed Out's breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well..."
    },
    {
      "id":6,
      "title": "Action Title",
      "description": "The titles of Washed Out's breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well..."
    }
  ]

    $rootScope.USERNAME = 'ashok';
    $rootScope.PASSWORD = 'ashok';

}).
controller('loginCtrl', ['$scope',  '$state', '$rootScope', function($scope,  $state, $rootScope){

  $scope.user = {
    "name": "",
    "password": ""
  }

  $scope.login = function(){
    if ($scope.user.name == $rootScope.USERNAME && $scope.user.password == $rootScope.PASSWORD){
      console.log("Login successful");
      $state.go('cards');
    }
    else{
      console.log("Login failed");
    }
  }

  $scope.register = function(){
    $state.go('register');
  }
}]).
controller('registerCtrl', ['$scope',  '$state', '$rootScope', function($scope,  $state, $rootScope){

  $scope.user = {
    "name": "",
    "password": "",
    "confirm_password": ""
  }

  $scope.register = function(){
    if ($scope.user.password == $scope.user.confirm_password){
      $rootScope.USERNAME = $scope.user.password;
      $rootScope.PASSWORD = $scope.user.confirm_password;
      console.log("Registration successful");
      $state.go('cards');
    }
    else{
      console.log("Registration failed");
    }
  }

}]).
controller('CardsCtrl', ['$scope', '$state', '$rootScope', function($scope,  $state, $rootScope){
    console.log('cards controller loaded', $rootScope.cards);

    $scope.edit = function(card){
      console.log("edit ", card);
      $state.go('editNotes', card)
    }


    $scope.delete = function(id){
      for (var i = 0; i <   $rootScope.cards.length; i++){

        console.log("for loop delete ");
        if ($rootScope.cards[i].id == id){
          console.log("will be deleted ", $rootScope.cards[i]);
          $rootScope.cards.splice(i, 1);
        }
      }
      console.log("delete ", id);
    }


    $scope.addNotes = function(){
      $state.go('addNotes');
      console.log('add notes called');
    }
  }
]).
controller('addNotesCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope){
    console.log("addNotesCtrl loaded", $rootScope.cards);
    $scope.user = {
      "id":'',
      "title":'',
      "description":''
    }

    $scope.save = function(){
      $scope.user.id = $rootScope.cards.length + 1;
      $rootScope.cards.push($scope.user);
      console.log("saving11 ", $scope.user);
      $state.go('cards');
    }

}

]).
controller('editNotesCtrl', ['$scope', '$state', '$rootScope', '$stateParams', function($scope, $state, $rootScope, $stateParams){
    console.log("editNotesCtrl loaded", $state.params.id);
    console.log("editNotesCtrl loaded", $state.params.title);
    console.log("editNotesCtrl loaded", $state.params.description);

    $scope.id = $state.params.id;
    $scope.title = $state.params.title;
    $scope.description = $state.params.description;

    $scope.update = function(){
      for (var i = 0; i <   $rootScope.cards.length; i++){
        if ($rootScope.cards[i].id == $scope.id){
          $rootScope.cards[i].title = $scope.title;
          $rootScope.cards[i].description = $scope.description;
          $state.go('cards');
        }
      }
    }
  }
]).
directive('header', function(){
  return{
    template:''
  }
}).
config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
  $locationProvider.hashPrefix('!');

  var cardsState = {
     name: 'cards',
     url: '/cards',
     templateUrl: 'cards/cards.html',
     controller: 'CardsCtrl'
   }

   var loginState = {
     name: 'login',
     url: '/login',
     templateUrl: 'login/login.html',
     controller: 'loginCtrl'
   }
   var registerState = {
     name: 'register',
     url: '/register',
     templateUrl: 'register/register.html',
     controller: 'registerCtrl'
   }

   var addState = {
     name: 'addNotes',
     url: '/addNotes',
     templateUrl: 'addNotes/addNotes.html',
     controller: 'addNotesCtrl'
   }

   var editState = {
     name: 'editNotes',
     url: '/editNotes/:id/:title/:description',
     templateUrl: 'editNotes/editNotes.html',
     controller: 'editNotesCtrl'
   }

   $stateProvider.state(cardsState);
   $stateProvider.state(loginState);
   $stateProvider.state(registerState);
   $stateProvider.state(addState);
   $stateProvider.state(editState);
}]);
