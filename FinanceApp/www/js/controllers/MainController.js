angular.module('app.App', [])
.controller('AppCtrl', function($rootScope, $scope, $location, $ionicModal, $q, db) {
  $scope.$on('$ionicView.enter', function(e) {
    if (!$rootScope.accountsRendered)
       loadAccounts();
     $rootScope.accountsRendered = true;
  }); 
    
  loadAccounts = function () {
    db.getAllAccounts().then(
      function (data) {
        $scope.accounts = data;
      },
      function (error) {
        console.log(error.message);
      });
  };
  
  $scope.dropTables = function () {
    db.dropTables();
    $rootScope.accountsRendered = false;
  } 
});