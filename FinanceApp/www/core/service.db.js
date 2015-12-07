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
      'Date DATETIME,' +
      'Value MONEY,' +
      'Description NVARCHAR(255),' +
      'FK_TypeID INTEGER,' +
      'FK_AccountID INTEGER' +
      ');');
    DBA.query('CREATE TABLE IF NOT EXISTS tbTransactionTypes (' +
      'PK_TransactionTypeID INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'Description NVARCHAR(255),' +
      'Icon VARCHAR(100)' +
      ');');
    //DBA.query('INSERT INTO tbTransactionTypes (`Icon`, `Description`) VALUES (?,?)', ['ion-ios-paper', 'Newspapers']);
  };
  
  this.dropTables = function () {
    DBA.query('DROP TABLE IF EXISTS tbAccounts');
    DBA.query('DROP TABLE IF EXISTS tbTransactions');
    DBA.query('DROP TABLE IF EXISTS tbTransactionTypes');
    this.createTables();
  };
  
  /*
   * Accounts
   */
 this.getAllAccounts = function () {
   return DBA.query('SELECT PK_AccountID AS ID, Name, Type, Balance FROM tbAccounts')
      .then(function(result){
        return Account.MapRows(DBA.getResults(result));
      });
  };
  
  this.getAccountById = function (id) {
    var parameters = [id];
      return DBA.query('SELECT PK_AccountID AS ID, Name, Type, Balance FROM tbAccounts WHERE PK_AccountID = ?', parameters)
        .then(function (result) {
          return Account.Map(DBA.getResults(result)[0]);
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
    var parameters = [trans.date, trans.value, trans.description, trans.accountId, trans.type.id];
    return DBA.query('INSERT INTO tbTransactions (`Date`, `Value`, `Description`, `FK_AccountID`, `FK_TypeID`) VALUES (?,?,?,?,?)', parameters);
  };
  
  this.getTransactionsForAccount = function (accountId) {
    var parameters = [accountId];
    return DBA.query('SELECT PK_TransactionID AS ID, Date, Value, Description, FK_TypeID AS Type, FK_AccountID AS AccountID ' +
      'FROM tbTransactions WHERE FK_AccountID = ?', parameters)
      .then(function (result) {
        return Transaction.MapRows(DBA.getResults(result));
      })
  };
  
  
  /*
   * Transaction Types
   */
   
  this.insertTransactionType = function (transactionType) {
    var parameters = [transactionType.description, transactionType.icon];
    return DBA.query('INSERT INTO tbTransactionTypes (`Description`, `Icon`) VALUES (?,?)', parameters);
  };
  
  this.getAllTransactionTypes = function () {
    return DBA.query('SELECT PK_TransactionTypeID AS ID, Description, Icon FROM tbTransactionTypes')
      .then(function (result) {
        return TransactionType.MapRows(DBA.getResults(result));
      })
  }
  
  this.getTransactionTypeById = function (transactionId) {
    var parameters = [transactionId];
    return DBA.query('SELECT PK_TransactionTypeID AS ID, Description, Icon FROM tbTransactionTypes WHERE PK_TransactionID = ?', parameters)
      .then(function (result) {
        return TransactionType.Map(DBA.getResults(result)[0]);
      });
  }
 
})
