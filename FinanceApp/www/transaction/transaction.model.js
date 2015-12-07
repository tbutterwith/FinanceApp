"use strict";
var Transaction = class Transaction {
  
  constructor() {
    
  }
  
  static MapRows(rows) {
    var transactions = [];
    
    for(var i = 0; i < rows.length; i++)
    {
      transactions.push(this.Map(rows[i]));
    }
    
    return transactions;
  }
  
  static Map(row) {
    if(row !== undefined){
      var transaction = new Transaction();
      
      transaction.id = row.ID;
      transaction.date = new Date(row.Date);
      transaction.value = row.Value;
      transaction.description = row.Description;
      transaction.type = row.Type;
      transaction.accountId = row.AccountID;
      
      return transaction;
    }
  }
}