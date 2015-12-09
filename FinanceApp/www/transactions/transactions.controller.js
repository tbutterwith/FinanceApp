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
        return db.getAccountById($scope.accountId);
      }).then(function(account) {
        $scope.account = account;
        updateTransactionForUI($scope.transactions);
      },
      function(error) {
          console.log(error.message);
      });
  };
  
  loadAllTransactions = function () {
    
  };
  
  updateTransactionForUI = function (transactions) {
    $scope.transactionsUI = [];
    
    var accountOpenTrans = createAccountOpenTransaction();
    transactions.push(accountOpenTrans);
    
    var balance = $scope.account.balance;
    var prevDate = new Date();
    $.each(transactions, function(i, tran) {
      tran.icon = $scope.transTypes[(tran.type - 1)];
      
      tran.accountBalance = balance;
      accountOpenTrans.value = balance;
      balance = balance + tran.value;
      tran.isTrans = true;
      
      if (tran.date.getUTCMonth() != prevDate.getUTCMonth()){
        var div = new Transaction();
        div.description = tran.date.toLocaleString('en-us', { month: "long" }) + ' ' + tran.date.getFullYear();
        div.isDivider = true;
        prevDate = tran.date;
        $scope.transactionsUI.push(div);
      }
      $scope.transactionsUI.push(tran);
    });
    
  };
  
  createAccountOpenTransaction = function() {
    trans = new Transaction();
    trans.date = $scope.account.dateAdded;
    trans.value = null;
    trans.description = "Account Open";
    return trans;
  };
  
  
  $scope.onClickNewTransaction = function () {
    $state.go('app.new_transaction', {id: null, accountId: $scope.accountId });
  };
});