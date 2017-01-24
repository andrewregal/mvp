angular.module('hdb.deckBuilder', [])
.controller('DeckBuilderController', function($scope) {

  $scope.cards = ['Angry Chicken', 'Ragnaros the Firelord', 'Lorewalker Cho'];
  $scope.deck = [];

  $scope.itemClicked = function(item) {
    $scope.deck.push(item);
  };
});
