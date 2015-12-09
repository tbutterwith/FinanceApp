angular.module('app.Account')
.controller('AccountCtrl', function($rootScope, $scope, $state,$ionicHistory, $stateParams, $ionicModal, $ionicPopup, db) {
  $scope.db = db;
  $scope.account = new Account();
  
  $scope.$on('$ionicView.enter', function(e) {
    if($stateParams.id !== ""){
      loadAccountDetails($stateParams.id);
      $scope.showDelete = true;
      $scope.showBalance = false;
    }
    else {
      $scope.account = new Account();
      $scope.account.type = 'Current';
      $scope.showBalance = true;
    }
  });
  
  loadAccountDetails = function(id) {
    db.getAccountById(id).then(
      function (account) {
        $scope.account = account;
      },
      function (error) {
        console.error(error.message);
      });
  };
  
  // inserts a new account into the db
  insertAccount = function() {
    $scope.account.name = $('#account-name').val();
    $scope.account.id = parseInt($('#account-id').text());
    $scope.account.type = $('#account-type').text();
    
    db.insertAccount($scope.account)
    .then( function (id) {
      $rootScope.accountsRendered = false;
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.transitionTo('app.transactions', {id: id}, {reload:true});
    });      
  };
  
  // updates account record
  updateAccount = function() {
    db.updateAccount($scope.account)
    .then( function () {
      $rootScope.accountsRendered = false;
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.transitionTo('app.transactions', {id: $scope.account.id}, {reload:true});
    });
  }
  
  $scope.onSubmitClick = function () {
    if($scope.account.id == undefined)
      insertAccount();
    else
      updateAccount();
  };
  
  $scope.onDeleteClick = function() {
    var confirmPopup = $ionicPopup.confirm({
     title: 'Delete Account',
     template: 'Are you sure you want to delete this account permenantly?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       db.deleteAccount($scope.account)
       .then( function () {
         $rootScope.accountsRendered = false;
         $ionicHistory.nextViewOptions({
           disableBack: true
         });
         $state.transitionTo('app.browse', null, {reload:true});
       });
     }
   });
  }
  
  $scope.onAccountTypeClick = function () {
    $scope.modal.show();
  };
  
  // adds selected account type to main form
  $scope.onSelectAccountType = function(type) {
    $scope.account.type = type;
    $scope.modal.hide();
  };
  
  $ionicModal.fromTemplateUrl('modal-account-type', {
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(modal) {
   $scope.modal = modal;
 });

  
})
