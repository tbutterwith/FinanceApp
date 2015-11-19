angular.module('app.services')

.factory('DBA', function ($cordovaSQLite, $q, $ionicPlatform) {
  // Handle query's and potential errors
  this.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(database, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error.message);
          q.reject(error);
        });
    });
    return q.promise;
  };
  
  // Proces a result set
  this.getResults = function(result) {
    var output = [];
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    
    return output;
  }
  
  return this;
})

.service('DBHelper', function ($cordovaSQLite, $q, DBA) {

  this.createTables = function() {
      DBA.query('DROP TABLE IF EXISTS tbAccounts');
      DBA.query('CREATE TABLE IF NOT EXISTS tbAccounts (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT' + 
        ',name NVARCHAR(255)' +
        ',type VARCHAR(255)' +
        ');');
  };
  
  this.dropTables = function () {
    
  };
  
  this.insertAccount = function (account) {
    var parameters = [account.name, account.type];
    console.log("inserting account");
    return DBA.query('INSERT INTO tbAccounts (`name`, `type`) VALUES (?, ?)', parameters);
  };
  
 this.getAllAccounts = function () {
   return DBA.query('SELECT id, name, type FROM tbAccounts')
      .then(function(result){
        return AccountMapper.MapRows(DBA.getResults(result));
      });
  };
  
  this.getAccountById = function (id) {
    var parameters = [id];
      return DBA.query('SELECT id, name, type FROM tbAccounts WHERE id = ?', parameters)
        .then(function (result) {
          
          return AccountMapper.Map(DBA.getResults(result)[0]);
        });
  };
 
})
