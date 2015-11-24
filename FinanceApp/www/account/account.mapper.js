"use strict";
class AccountMapper {
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
      account.name = row.Name;
      account.type = row.Type;
      account.Balance = row.Balance;
      
      return account;
    }
  }
}