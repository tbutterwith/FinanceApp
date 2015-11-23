angular.module('app.controllers')
.controller('TransactionsCtrl', function($scope, $state, $stateParams, $ionicModal, $compile, db) {
  var addButton = '<button class="button button-clear button-positive button-icon ion-ios-plus-empty" ng-click="onClickNewTransaction()"></button>';
  
  $scope.$on('$ionicView.enter', function(e) {
    var compiledButton = $compile(addButton)($scope);
    $('ion-header-bar .buttons-right').html(compiledButton);
    if($stateParams.id !== undefined){
      loadTransactionsForAccount($stateParams.id)
    }
  });
  
  loadTransactionsForAccount = function (accountID){
    db.getTransactionsForAccount(accountID)
      .then(function (transactions) {
        $scope.transactions = transactions;
      },
      function (error) {
        console.log(error.message);
      });
  };
  
  loadAllTransactions = function () {
    
  };
  
  $scope.createTransaction = function () {
    
  };
  
  $scope.onClickNewTransaction = function () {
    $state.transitionTo('app.new_transaction', {id: ""}, {reload:true});
  };
});