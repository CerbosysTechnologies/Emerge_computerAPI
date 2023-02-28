const pool = require("../../authorization/config");

const jwt=require('jsonwebtoken')
const passport=require('passport')
require('../../authorization/passport')(passport)




module.exports.searchProduct = function (req, res, next)   {
  
  passport.authenticate('jwt',function(err ,user){
  if(err||!user)
  {
    console.log("User",err);
    return res.json({ status: 401, success: false, message: "Authentication Fail." });
}
  else
  {
    //var product_id=req.body.product_id
      var product_name =req.body.product_name
  //    if(product_id==undefined)
  //     {
  //         console.log("not product_id")
  //         //console.log("hello")
  //     }
  //     else
  //     {
  //  //search_query = pool.query("select * from mycp1 where product_id=?")
  // //console.log(query1)
  // pool.query("select * from product where product_id=?",[product_id],function(err,result){
  // if(err) throw err;
  // console.log(result)
  // //res.send(result)
  // })
  //         console.log("hello")
  //     }
  //        // console.log("not product_id")
      if(product_name==undefined)
      {
          console.log(" not name")
      }
      else
      { 
          pool.query("select * from product where product_name=?",[product_name],function(err,result){
            
              if(err){
                console.log("eror while searching this product ");
                res.send({status:400,success:false,message:"No Detail Found"});
            }
            else{
                console.log("search get successfully");
                res.send({status:200,success:true,message:"Detail Found", data:result});
            }




              
          //  console.log(result)
          //   console.log("name")
          //   res.send(result)
              })
      }
  }
  })(req,res,next)



  /*exports.getallmonitor =function(req,res,next){

       console.log("hello");
    // passport.authenticate('jwt',function(err,user){
    //   if (err||!user)
    //   {
    //     console.log("user",user);
    //     return res.json({status:401, success:false, message: 'authentication fail'})
    //   }
    //   else {

    //   var moniter = req.body.product_name
    //     pool.query("select * from product where product_name=?",moniter,function(err,result){
    //       if(err) throw err
    //       else 
    //       console.log("sucess",result);

    //     })
    //       log ("user login  is here")


    //   }
      

    // })(req,res,next)
}*/

// module.exports.getallmonitor=function(req,res)
// {


//   console.log("hello")
// }














    // var name = req.query.name; 
    // console.log(name);
    // var search_query;
    // if(name)
    //         {
                
    
    //             }
    //             console.log('Query', search_query);
    //             pool.query(search_query, function(err,data){
                
    //             if(err) {
    //                 console.log(err)
    //                 response = {status:400,success:false,message:"Error fetching data"};
    //             } 
    //             else if(data.length == 0){
    //               response = {status: 200, success : false, message : "No Data Found"};
    //             }
    //             else {
                    
    //                 response = {status: 200, success : true, message : "Data Found", "SearchData": data};
    //             }
      
    //             res.json(response);
    //         });


}

