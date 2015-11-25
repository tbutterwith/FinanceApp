angular.module('app.TransactionType')
.controller('TransactionTypeCtrl', function($scope, $state, $stateParams, $ionicModal, $ionicHistory, db) {
  $scope.type = {};
  $scope.type.icon = 'ion-ios-paper';
  
  $scope.$on('$ionicView.enter', function(e) {
    $scope.icons = available_icons;
  });
  
  $scope.onIconClick = function() {
    $scope.modal.show();
  };
  
  $scope.onIconGridClick = function(icon) {
    $scope.type.icon = icon;
    $scope.modal.hide();
  };
  
  $scope.onSubmitClick = function() {
    db.insertTransactionType($scope.type)
      .then(function (result) {
        $ionicHistory.goBack();
      });
  };
  
  $ionicModal.fromTemplateUrl('modal-type-icons', {
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(modal) {
   $scope.modal = modal;
 });
});