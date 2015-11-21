angular.module('app.controllers')
.controller('AppCtrl', function($rootScope, $scope, $location, $ionicModal, $q, db) {
  $scope.$on('$ionicView.enter', function(e) {
    if (!$rootScope.accountsRendered)
       loadAccounts();
     $rootScope.accountsRendered = true;
  }); 
    
  var loadAccounts = function () {
    db.getAllAccounts().then(
      function (data) {
        var menu = $('#menu-account-list .list');
        $.each(data, function(i, account) {
          console.log(account);
          var url = '#/accounts/' + account.id;
          var item = '<ion-item menu-close href="'+ url +'" accountID="' + account.id + '" class="item item-complex">'
           + '<a class="item-content" ng-href="'+ url +'" href="'+ url +'">' +  account.name + '</a>'
           + '</ion-item>';
          menu.append(item);
        });
      },
      function (error) {
        console.log(error.message);
      });
  } 
})


.controller('AppCont', function($scope, db) {
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})