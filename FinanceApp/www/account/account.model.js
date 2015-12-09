"use strict";
var Account = class Account {
  
  constructor() {
    
  }
  
  static MapRows(rows) {
    var accounts = [];
    
    for(var i = 0; i < rows.length; i++)
    {
      accounts.push(this.Map(rows[i]));
    }
    
    return accounts;
  }
  
  static Map(row) {
    if(row !== undefined){
      var account = new Account();
      
      account.id = row.ID;
      account.dateAdded = new Date(row.DateAdded);
      account.name = row.Name;
      account.type = row.Type;
      account.balance = row.Balance;
      
      return account;
    }
  }
}