const pool = require("../../authorization/config");



const  ShoppingCart = function(shoppingcart){
    this.user_id=shoppingcart.user_id
    this.product_id=shoppingcart.product_id
    this.product_name=shoppingcart.product_name
    this.product_price=shoppingcart.product_price
    this.product_discount=shoppingcart.product_discount
    this.product_actualprice=shoppingcart.product_actualprice
    this.product_quantity=shoppingcart.product_quantity
    this.product_image = shoppingcart.product_image;
    this.length = shoppingcart.length;
    this.offer_id=shoppingcart.offer_id
    this.offerdiscount=shoppingcart.product_image
    this.dateAdded=shoppingcart.dateAdded
    this.statusId = shoppingcart.statusId
    this.createdById =shoppingcart.createdById
    this.creationDate=shoppingcart.creationDate
    this.modifiedById= shoppingcart.modifiedById
    this.modificationDate =shoppingcart.modificationDate

}

ShoppingCart.createShoppingCart = function (shopping,name ,result) {    


console.log(shopping)
console.log(name)



pool.query(`insert into shopping_cart set user_id='${shopping.user_id}',product_id=${shopping.product_id},product_name='${shopping.product_name}',product_price='${shopping.product_price}',product_discount='${shopping.product_discount}',product_actualprice=${shopping.product_actualprice},product_quantity=${shopping.product_quantity},product_image='${name}',length= ${shopping.length},offer_id='${shopping.offer_id}',offerdiscount='${shopping.offerdiscount}',statusId='${shopping.statusId}',createdById='${shopping.createdById}',creationDate='${shopping.creationDate}'`,function(err,res){
    if(err){
        console.log("eror while inserting data in cart ");
        result(null,err)
    }
    else{
        console.log("add to cart  successfully");
        result(null,res)
    }
})



    /*pool.query("INSERT INTO shopping_cart set?",[shopping],"product_image="[name],function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{
                console.log(res.insertId);         
                result(null, {status:200,success:true,message:"Details Saved Successfully."});

            }
        });*/           
};
ShoppingCart.AllCartItems = function (id,result) {           
    pool.query("select * from shopping_cart WHERE user_id=?",
    [id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};






 



module.exports=ShoppingCart


