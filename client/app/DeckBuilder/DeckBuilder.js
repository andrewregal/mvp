var config = {
  headers: {
    'X-Mashape-Key': 'JG4Hr8e6XqmshdQzPf44TwykMaWQp10d7O8jsn10AvBBzYyLI4',
    'Accept': 'application/json'
  }
};

angular.module('hdb.deckBuilder', [])
.controller('DeckBuilderController', function($scope, $http, ChooseClass) {

  $scope.currentClass = ChooseClass.getClass();
  $scope.cards = [];
  $scope.deck = [];
  $scope.deckList = {};

  $scope.itemClicked = function(item) {
    $scope.deckList.size = $scope.deckList.size || 0;
    $scope.deckList.cards = $scope.deckList.cards || [];

    if ($scope.deckList.size < 30) {
      var cardFound = false;
      for (var i = 0; i < $scope.deckList.cards.length; i++) {
        if ($scope.deckList.cards[i].name === item.name) {
          cardFound = true;
          if ($scope.deckList.cards[i].rarity !== 'Legendary' && $scope.deckList.cards[i]['cardCount'] === 1) {
            $scope.deckList.cards[i]['cardCount']++;
            $scope.deckList.size++;
          }
        }
      }

      if (!cardFound) {
        $scope.deckList.size++;
        item['cardCount'] = 1;
        $scope.deckList.cards.push(item);
      }
    }
  };

  $scope.fetch = function() {
    $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/' + ChooseClass.getClass() + '?collectible=1', config)
    .then(function(results) {
      results.data.forEach(function (card) {
        $scope.cards.push(card);
      });
    })
    .then(function() {
      // remove hero portraits
      if (ChooseClass.getClass() === 'Rogue' || ChooseClass.getClass() === 'Druid' || ChooseClass.getClass() === 'Warlock') {
        $scope.cards.shift();
      } else if (ChooseClass.getClass() === 'Hunter' || ChooseClass.getClass() === 'Paladin' || ChooseClass.getClass() === 'Priest' || ChooseClass.getClass() === 'Shaman') {
        $scope.cards.shift();
        $scope.cards.shift();
      } else if (ChooseClass.getClass() === 'Mage') {
        $scope.cards.shift();
        $scope.cards.shift();
        $scope.cards.shift();
      }
    });
  };

  if (ChooseClass.getClass() !== '') {
    $scope.fetch();
  }
});
