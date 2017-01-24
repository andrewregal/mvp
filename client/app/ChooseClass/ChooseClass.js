angular.module('hdb.chooseClass', [])
.controller('ChooseClassController', function($scope, ChooseClass) {
  $scope.pickDruid = function() {
    ChooseClass.setClass('Druid');
    console.log('Current Class === ', ChooseClass.getClass());
  };
  $scope.pickHunter = function() {
    ChooseClass.setClass('Hunter');
    console.log('Current Class === ', ChooseClass.getClass());
  };
  $scope.pickMage = function() {
    ChooseClass.setClass('Mage');
    console.log('Current Class === ', ChooseClass.getClass());
  };
  $scope.pickPaladin = function() {
    ChooseClass.setClass('Paladin');
    console.log('Current Class === ', ChooseClass.getClass());
  };
  $scope.pickPriest = function() {
    ChooseClass.setClass('Priest');
    console.log('Current Class === ', ChooseClass.getClass());
  };
  $scope.pickRogue = function() {
    ChooseClass.setClass('Rogue');
    console.log('Current Class === ', ChooseClass.getClass());
  };
  $scope.pickShaman = function() {
    ChooseClass.setClass('Shaman');
    console.log('Current Class === ', ChooseClass.getClass());
  };
  $scope.pickWarlock = function() {
    ChooseClass.setClass('Warlock');
    console.log('Current Class === ', ChooseClass.getClass());
  };
  $scope.pickWarrior = function() {
    ChooseClass.setClass('Warrior');
    console.log('Current Class === ', ChooseClass.getClass());
  };
});
