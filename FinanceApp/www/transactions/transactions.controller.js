angular.module('app.Transactions')
.controller('TransactionsCtrl', function($scope, $state, $stateParams, $ionicModal, $compile, db) {
  var addButton = '<button class="button button-clear button-positive button-icon ion-ios-plus-empty" ng-click="onClickNewTransaction()"></button>';
  
  $scope.$on('$ionicView.enter', function(e) {
    var compiledButton = $compile(addButton)($scope);
    $('ion-header-bar .buttons-right').html(compiledButton);
    if($stateParams.id !== undefined){
      loadTransactionsForAccount($stateParams.id);
      $scope.accountId = $stateParams.id;
    } else {
      loadAllTransactions();
    }
  });
  
  loadTransactionsForAccount = function (accountId){
    db.getTransactionsForAccount(accountId)
      .then(function (transactions) {
        $scope.transactions = transactions;
        console.log(transactions);
      },
      function (error) {
        console.log(error.message);
      });
  };
  
  loadAllTransactions = function () {
    
  };
  
  
  $scope.onClickNewTransaction = function () {
    $state.go('app.new_transaction', {id: null, accountId: $scope.accountId });
  };
});