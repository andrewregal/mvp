angular.module('hdb', [
  'ngRoute',
  'hdb.chooseClass'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/ChooseClass/ChooseClass.html',
    controller: 'ChooseClassController'
  });
});
