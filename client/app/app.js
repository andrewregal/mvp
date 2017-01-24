angular.module('hdb', [
  'ngRoute',
  'hdb.chooseClass',
  'hdb.deckBuilder'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/ChooseClass/ChooseClass.html',
    controller: 'ChooseClassController'
  })
  .when('/deckBuilder', {
    templateUrl: 'app/DeckBuilder/DeckBuilder.html',
    controller: 'DeckBuilderController'
  });
})
.factory('ChooseClass', function() {
  var userClass = 'Test';
  var getClass = function() {
    return userClass;
  };
  var setClass = function(classChosen) {
    userClass = classChosen;
  };

  return {
    getClass: getClass,
    setClass: setClass
  };
});
