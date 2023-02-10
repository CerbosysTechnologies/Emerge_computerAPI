const pool = require("../../authorization/config");




module.exports.searchProduct = function (req, res, next)   {
    var name = req.query.name; 
    console.log(name);
    var search_query;
    if(name)
            {
                // search_query = `SELECT * category.category,quantity from 
                // enquiry
                // LEFT JOIN category ON (category.category =enquiry.category) 
                // LEFT JOIN
                // where enquiry.name LIKE '%${name}%' and enquiry.statusId=1
                // Order By enquiry.name DESC`
                search_query= "select login.s_no,login.mobile_number , enquiry.quantity from login  inner join enquiry  on  login.s_no=login.s_no"
    
                }
                console.log('Query', search_query);
                pool.query(search_query, function(err,data){
                
                if(err) {
                    console.log(err)
                    response = {status:400,success:false,message:"Error fetching data"};
                } 
                else if(data.length == 0){
                  response = {status: 200, success : false, message : "No Data Found"};
                }
                else {
                    //console.log('TC', totalCount);
                    //console.log('Size', size);
                  //var totalPages = Math.ceil(totalCount[0].Total / size);    
    
                    response = {status: 200, success : true, message : "Data Found", "SearchData": data};
                }
      
                res.json(response);
            });


}

