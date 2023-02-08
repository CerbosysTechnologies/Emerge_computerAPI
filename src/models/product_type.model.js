const mysql=require('mysql')
const pool = require("../../authorization/config");

//Constructor
const ProductType = function(producttype, file) {     
    this.product_type_id = producttype.product_type_id;
    this.product_type_name = producttype.product_type_name;
    this.image = file;
    this.status = producttype.status;
    this.creationDate = producttype.creationDate;  
  
    
    this.createdById = producttype.createdById;
    this.modifiedById = customiseddesign.modifiedById;
    this.modificationDate = customiseddesign.modificationDate;
  };
