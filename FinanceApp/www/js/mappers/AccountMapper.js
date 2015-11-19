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
    var account = new Account();
    
    account.id = row.id;
    account.name = row.name;
    account.type = row.type;
    
    return account;
  }
}