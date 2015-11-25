"use strict";
var Transaction = class Transaction {
  
  constructor() {
    
  }
  
  static MapRows(rows) {
    var transactions = [];
    
    for(var i = 0; i < rows.length; i++)
    {
      accounts.push(this.Map(rows[i]));
    }
    
    return transactions;
  }
  
  static Map(row) {
    if(row !== undefined){
      var transaction = new Transaction();
      
      transaction.id = row.ID;
      transaction.value = row.Value;
      transaction.description = row.Description;
      transaction.type = row.type;
      transaction.accountID = row.accountID;
      
      return transaction;
    }
  }
}