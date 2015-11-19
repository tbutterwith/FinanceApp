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

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'AppCont',
        resolve: {
          db: function(DBHelper){
            return DBHelper;
          }
        }
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
    .state('app.playlists', {
      url: '/startpage',
      views: {
        'menuContent': {
          templateUrl: 'templates/NewAccount.html',
          controller: 'NewAccountCtrl',
          resolve: {
            db: function(DBHelper){
              return DBHelper;
            }
          }
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl',
        resolve: {
          db: function(DBHelper){
            return DBHelper;
          }
        }
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/startpage');
});
