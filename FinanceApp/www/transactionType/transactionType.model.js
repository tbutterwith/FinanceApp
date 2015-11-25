"use strict";
var TransactionType = class TransactionType {
  
  constructor() {
    
  }
  
  static MapRows(rows) {
    var transactionTypes = [];
    
    for(var i = 0; i < rows.length; i++)
    {
      transactionTypes.push(this.Map(rows[i]));
    }
    
    return transactionTypes;
  }
  
  static Map(row) {
    if(row !== undefined){
      var transactionType = new TransactionType();
      
      transactionType.id = row.ID;
      transactionType.icon = row.Icon;
      transactionType.description = row.Description;
      
      return transactionType;
    }
  }
}