//ionic emulate ios --target="iPad-Air-2" -l -c -s

var database = null;
angular.module('FinanceApp', ['ionic', 'ngCordova', 'app.controllers', 'app.services'])

.run(function($ionicPlatform, $rootScope, $cordovaSQLite, $cordovaSplashscreen, DBHelper) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if (window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //   cordova.plugins.Keyboard.disableScroll(true);
    // 
    // }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    if(window.cordova) {
      // App syntax
      database = $cordovaSQLite.openDB({name: "accounts.db", location: 1, createFromLocation: 1});
    } else {
      database = window.openDatabase("accounts.db", "1.0", "Accounts DB", -1);
    }
    DBHelper.createTables();
    //$cordovaSplashscreen.hide();
    $rootScope.accountsRendered = false;
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    resolve: {
      db: function(DBHelper){
        return DBHelper;
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    
    .state('app.new_account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/Account.html',
          controller: 'Account',
          resolve: {
            db: function(DBHelper){
              return DBHelper;
            }
          }
        }
      }
    })
    
    .state('app.account_edit', {
      url: '/account/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/Account.html',
          controller: 'Account',
          resolve: {
            db: function(DBHelper){
              return DBHelper;
            }
          }
        }
      }
    })

  .state('app.transactions', {
    url: '/transactions/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/transactions.html',
        controller: 'TransactionsCtrl',
        resolve: {
          db: function(DBHelper){
            return DBHelper;
          }
        }
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/account');
});
