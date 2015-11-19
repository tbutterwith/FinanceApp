angular.module('app.controllers')
.controller('AppCtrl', function($rootScope, $scope, $state, $ionicModal, $q, db) {
  $scope.$on('$ionicView.enter', function(e) {
    if (!$rootScope.accountsRendered)
       loadAccounts();
     $rootScope.accountsRendered = true;
  }); 
    
  var loadAccounts = function () {
    db.getAllAccounts().then(
      function (data) {
        $scope.accounts = data;
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