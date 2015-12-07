angular.module('app.Transaction')
.controller('TransactionCtrl', function($scope, $state, $stateParams, $ionicModal, $ionicHistory, $filter, db) {
$scope.newTrans = true;
  $scope.$on('$ionicView.beforeEnter', function(e) {
    
    db.getAllTransactionTypes()
      .then(function (result) {
        $scope.transactiontypes = result;
        $scope.trans.type = $scope.transactiontypes[0];
      });
      
    if($stateParams.id == null && $scope.newTrans){
      $scope.trans = {};
      $scope.trans.accountId = $stateParams.accountId;
      $('ion-header-bar .buttons-right').html('')
      $scope.trans.date = new Date();
      $scope.newTrans = false;
    }
  });
  
  $scope.onSubmitClick = function () {
    console.log($scope.trans);
    db.insertTransaction($scope.trans)
      .then( function (result) {
          $ionicHistory.goBack();
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