angular.module('app.Services', [])

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
    DBA.query('CREATE TABLE IF NOT EXISTS tbAccounts (' +
      'PK_AccountID INTEGER PRIMARY KEY AUTOINCREMENT,' + 
      'Name NVARCHAR(255),' +
      'Type VARCHAR(255),' +
      'Balance MONEY' +
      ');');
    DBA.query('CREATE TABLE IF NOT EXISTS tbTransactions (' +
      'PK_TransactionID INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'Value MONEY,' +
      'Description NVARCHAR(255),' +
      'FK_TypeID INTEGER,' +
      'FK_AccountID INTEGER' +
      ');');
  };
  
  this.dropTables = function () {
    DBA.query('DROP TABLE IF EXISTS tbAccounts');
    DBA.query('DROP TABLE IF EXISTS tbTransactions');
    this.createTables();
  };
  
  /*
   * Accounts
   */
 this.getAllAccounts = function () {
   return DBA.query('SELECT PK_AccountID AS ID, Name, Type, Balance FROM tbAccounts')
      .then(function(result){
        return AccountMapper.MapRows(DBA.getResults(result));
      });
  };
  
  this.getAccountById = function (id) {
    var parameters = [id];
      return DBA.query('SELECT PK_AccountID AS ID, Name, Type, Balance FROM tbAccounts WHERE PK_AccountID = ?', parameters)
        .then(function (result) {
          return AccountMapper.Map(DBA.getResults(result)[0]);
        });
  };
  
  this.insertAccount = function (account) {
    var parameters = [account.name, account.type, account.balance];
    return DBA.query('INSERT INTO tbAccounts (`Name`, `Type`, `Balance`) VALUES (?, ?, ?)', parameters);
  };
 
  this.updateAccount = function (account) {
    var parameters = [account.name, account.type, account.id];
    return DBA.query('UPDATE tbAccounts SET Name=?, Type=? WHERE PK_AccountID = ?', parameters);
  };
  
  this.deleteAccount = function (account) {
    var parameters = [account.id];
    return DBA.query('DELETE FROM tbAccounts WHERE PK_AccountID = ?', parameters);
  };
  
  this.updateAccountBalance = function(accountId, balance) {
    var parameters = [balance, accountId];
    return DBA.query('UPDATE tbAccounts SET Balance = ? WHERE PK_AccountID = ?', parameters);
  }
  
  /*
   * Transactions
   */
  this.insertTransaction = function (trans) {
    var parameters = [trans.value, trans.AccountID];
    return DBA.query('INSERT INTO tbTransactions (`Value`, `FK_AccountID`) VALUES (?,?)', parameters);
  };
  
  this.getTransactionsForAccount = function (accountID) {
    var parameters = [accountID];
    return DBA.query('SELECT PK_TransactionID AS ID, Value, Description, FK_TypeID AS Type, FK_AccountID AS AccountID ' +
      'FROM tbTransactions WHERE FK_AccountID = ?', parameters)
      .then(function (result) {
        return TransactionMapper.MapRows(DBA.getResults(result));
      })
  }
 
 
})
