angular.module('app.Transaction')
.controller('TransactionCtrl', function($scope, $state, $stateParams, $ionicModal, $filter, db) {
  $scope.trans = {};

  $scope.$on('$ionicView.enter', function(e) {
    
    db.getAllTransactionTypes()
      .then(function (result) {
        $scope.transactiontypes = result;
        $scope.trans.type = $scope.transactiontypes[0];
      });
      
    if($stateParams.id == null){
      $scope.trans.accountId = $stateParams.accountId;
      $('ion-header-bar .buttons-right').html('')
      $scope.date = new Date();
      
    }
  });
  
  $scope.onSubmitClick = function () {
    db.insertTransaction($scope.trans)
      .then( function (result) {
        
      }, function (error){
        console.log(error.message);
      });
  };
  
  $scope.onTypeClick = function () {
    $scope.modal.show();
  };
  
  $scope.onClickNewTransType = function () {
    $scope.modal.hide();
    $state.go('app.transactionType', null);
  };
  
  // adds selected transaction type to main form
  $scope.onSelectTransactionType = function(type) {
    $scope.trans.type = type;
    $scope.modal.hide();
  };
  
  $ionicModal.fromTemplateUrl('modal-transaction-type', {
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(modal) {
   $scope.modal = modal;
 });
});