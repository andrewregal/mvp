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
  $scope.costChart = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0 // 7 or more under same category
  };
  $scope.content = ChooseClass.getClass();
  $scope.showClassCards = true;
  $scope.showNeutralCards = false;
  $scope.neutralCards = [];

  $scope.changeView = function() {
    if ($scope.content === $scope.currentClass) {
      $scope.content = 'Neutral';
      $scope.showClassCards = false;
      $scope.showNeutralCards = true;
    } else if ($scope.content === 'Neutral') {
      $scope.content = ChooseClass.getClass();
      $scope.showClassCards = true;
      $scope.showNeutralCards = false;
    }
  };

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
            var insertCost = item.cost;
            if (item.cost > 7) {
              insertCost = 7;
            }
            $scope.costChart[insertCost]++;
          }
        }
      }

      if (!cardFound) {
        $scope.deckList.size++;
        item['cardCount'] = 1;
        $scope.deckList.cards.push(item);
        var insertCost = item.cost;
        if (item.cost > 7) {
          insertCost = 7;
        }
        $scope.costChart[insertCost]++;
      }
    }
    $scope.sortCards();
  };

  $scope.deckListClicked = function(item) {
    for (var j = 0; j < $scope.deckList.cards.length; j++) {
      if ($scope.deckList.cards[j].name === item.name) {
        $scope.deckList.cards[j].cardCount--;
        if ($scope.deckList.cards[j].cardCount === 0) {
          $scope.deckList.cards.splice(j, 1);
        }
      }
    }
    $scope.deckList.size--;
    var removeCost = item.cost;
    if (item.cost > 7) {
      removeCost = 7;
    }
    $scope.costChart[removeCost]--;

    $scope.sortCards();
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
      } else if (ChooseClass.getClass() === 'Hunter' || ChooseClass.getClass() === 'Paladin' || ChooseClass.getClass() === 'Priest' || ChooseClass.getClass() === 'Shaman' || ChooseClass.getClass() === 'Warrior') {
        $scope.cards.shift();
        $scope.cards.shift();
      } else if (ChooseClass.getClass() === 'Mage') {
        $scope.cards.shift();
        $scope.cards.shift();
        $scope.cards.shift();
      }
    });
  };

  $scope.fetchNeutral = function() {
    $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Neutral?collectible=1', config)
    .then(function(results) {
      results.data.forEach(function (card) {
        $scope.neutralCards.push(card);
      });
    });
  };

  $scope.sortCards = function() {
    $scope.deckList.cards.sort(function(a, b) {
      if (a.cost === b.cost) {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      }
      if (a.cost < b.cost) {
        return -1;
      } else if (a.cost > b.cost) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  if (ChooseClass.getClass() !== '') {
    $scope.fetch();
    $scope.fetchNeutral();
  }
});
