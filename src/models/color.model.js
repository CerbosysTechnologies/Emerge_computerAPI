const mysql=require('mysql');
const pool = require('../../authorization/config');




const Color = function (color) {
    this.color_id = color.color_id;
    this.color_name = color.color_name;
    this.statusId= color.statusId;
    this.createdById = color.createdById;
    this.creationDate = color.creationDate;
    this.modificationDate = color.modificationDate;
    this.modifiedById = color.modifiedById
  };


// Add Color
Color.addColorM = function (color, result) {       
    pool.query(`select color_name from color where color_name ='${color.color_name}'`, function (err, res) {
            if(err) {
                console.log(err);
            }
            else{
                try {
                    if(res.length!=0){
                        result(err,{status:400,success:false,message:"Color Name is Already Saved."}) 
                    }
                    else{
                        pool.query("INSERT INTO color SET ?", color, function (err, res) {
                            if(err) {
                                result(err, null);
                            }                
                            else{                               
                                result(null, {status:200,success:true,message:"Details Saved Successfully."});
                            }
                            });
                    }
                    
                } catch (e) {
                    console.log(e)
                }
            }
        });           
};




// Get All Color
Color.getAllColorM = function (result) {       
    pool.query("select * from color where statusId=1 order by color_id desc", function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
}



// get Color By Id
Color.getColorByIdM = function (color_id, result) {       
    pool.query(`select * from color Where statusId=1 and color_id=?`,[color_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};



// Update Color
Color.updateColorM = function (color_id,color, result) {       
    pool.query(`select color_name from color where color_name ='${color.color_name}'`, function (err, res) {
            if(err) {
                console.log(err);
            }
            else{
                try {
                    if(res.length!=0){
                        result(err,{status:400,success:false,message:"Color is Already Saved."}) 
                    }
                    else{
                        pool.query("update color SET color_name=?, modifiedById=?, modificationDate=? where color_id=?", 
                        [color.color_name,color.modifiedById, color.modificationDate,color_id], function (err, res) {
                                if(err) {
                                    console.log(err);
                                    result(err, null);
                                }
                                else{                       
                                    result(null, {status:200,success:true,message:"Details Updated Successfully."});
                    
                                }
                            });   
                    }
                    
                } catch (e) {
                    console.log(e)
                }
            }
        });           
};




// Get Color By Name 
Color.getColorByName= function (color_name, result) {       
    pool.query(`select * from color Where statusId=1 and color_name=?`,[color_name], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};




module.exports=Color;