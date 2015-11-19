angular.module('app.controllers')
.controller('NewAccountCtrl', function($scope, $ionicModal, db) {
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
    
    //console.log(account.type);
    db.insertAccount($scope.account)
    .then( function () {
      db.getAllAccounts()
        .then (function (data) {
          console.log(data);
        });
    });
    
  };
  
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
