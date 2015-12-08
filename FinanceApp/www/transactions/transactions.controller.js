angular.module('app.Transactions')
.controller('TransactionsCtrl', function($scope, $state, $stateParams, $ionicModal, $compile, db) {
  var addButton = '<button class="button button-clear button-positive button-icon ion-ios-plus-empty" ng-click="onClickNewTransaction()"></button>';
  
  $scope.$on('$ionicView.enter', function(e) {
    
    var compiledButton = $compile(addButton)($scope);
    $('ion-header-bar .buttons-right').html(compiledButton);
    
    if($stateParams.id !== undefined){
      $scope.accountId = $stateParams.id;
      loadTransactionsForAccount($scope.accountId);
    } else {
      loadAllTransactions();
    }
  });
  
  loadTransactionsForAccount = function (accountId){
    db.getTransactionsForAccount(accountId)
      .then(function (transactions) {
        $scope.transactions = transactions;
        return db.getAllTransactionTypes();
      }).then(function (transTypes){
        $scope.transTypes = transTypes;
        return db.getAccountBalance($scope.accountId);
      }).then(function(balance) {
        $scope.accountBalance = parseFloat(balance);
        updateTransactionForUI($scope.transactions);
      },
      function(error) {
          console.log(error.message);
      });
  };
  
  loadAllTransactions = function () {
    
  };
  
  updateTransactionForUI = function (transactions) {
    var balance = $scope.accountBalance;
    $.each(transactions, function(i, tran) {
      console.log($scope.transTypes);
      tran.icon = $scope.transTypes[(tran.type - 1)];
      tran.accountBalance = balance;
      balance = balance + tran.value;
      console.log(tran);
    });
  }
  
  
  $scope.onClickNewTransaction = function () {
    $state.go('app.new_transaction', {id: null, accountId: $scope.accountId });
  };
});