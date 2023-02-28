const pool = require("../../authorization/config");

const Wishlist = function(wishlist) {   
    this.product_name = wishlist.product_name;
    this.product_description = wishlist.product_description;
    this.user_id = wishlist.user_id;
    this.product_id = wishlist.product_id;
    this.statusId = wishlist.statusId;
    this.createdById = wishlist.createdById;
    this.creationDate = wishlist.creationDate;
    this.modifiedById = wishlist.modifiedById;
    this.modificationDate = wishlist.modificationDate;
  };



  Wishlist.addWishlist = function (wishlist, result) {       
    pool.query("INSERT INTO wishlist SET ?", wishlist, function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{
                console.log(wishlist,"wishlist ooooo");
                console.log(res.insertId);         
                result(null, {status:200,success:true,message:"Details Saved Successfully."});

            }
        });           
};


Wishlist.deleteWishlist = function (id,result) {       
    pool.query("delete from wishlist where wishlist_id=?", 
    [id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{ 
                console.log(res);                      
                result(null, {status:200,success:true,message:"Details deleted Successfully."});

            }
        });           
};


module.exports=Wishlist;
