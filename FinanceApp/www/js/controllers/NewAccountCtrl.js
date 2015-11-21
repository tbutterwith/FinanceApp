angular.module('app.controllers')
.controller('NewAccountCtrl', function($rootScope, $scope, $state,$ionicHistory, $ionicModal, db) {
  $scope.db = db;
  $scope.account = new Account();
  
  $scope.$on('$ionicView.enter', function(e) {
    
  });
  
  $scope.accountSelect = function () {
    $scope.modal.show();
  };
  
  $scope.insertAccount = function() {
    $scope.account.name = $('#account-name').val();
    $scope.account.id = parseInt($('#account-id').text());
    $scope.account.type = $('#account-type').text();
    
    //console.log(account.type);
    db.insertAccount($scope.account)
    .then( function () {
      resetForm();
      $rootScope.accountsRendered = false;
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.transitionTo('app.browse', null, {reload:true});
    });
    
      
    
  };
  
  resetForm = function () {
    $('#account-name').val('');
    $('#account-type').text('Current');
  }
  $scope.selectAccountType = function(type) {
    $scope.account.type = type;
    $('#account-type').text(type);
    $scope.modal.hide();
  };
  
  $ionicModal.fromTemplateUrl('modal-account-type', {
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(modal) {
   $scope.modal = modal;
 });

  
})
