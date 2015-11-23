angular.module('app.controllers')
.controller('TransactionCtrl', function($scope, $state, $stateParams, $ionicModal, $filter, db) {
  
  $scope.$on('$ionicView.enter', function(e) {
    $scope.date = new Date();
  });
});