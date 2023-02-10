const mysql=require('mysql');
const pool = require('../../authorization/config');




const Color = function (color) {
    this.color_id = color.color_id;
    this.color_name = color.color_name;
    this.status = color.status;
    this.createdById = color.createdById;
    this.creation_date = color.creation_date;
    this.modification_date = color.modification_date ;
    this.modifiedById = color.modifiedById
  };



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





Color.getAllColorM = function (result) {       
    pool.query("select * from color where status=1", function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
}




Color.getColorByIdM = function (color_id, result) {       
    pool.query(`select * from color Where status=1 and color_id=?`,[color_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};


Color.updateColorM = function (color_id,color,result) {       
    pool.query("update color SET color_name=?, modifiedById=?, modification_date=? where color_id=?", 
    [color.color_name,color.modifiedById, color.modification_date,color_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, {status:200,success:true,message:"Details Updated Successfully."});

            }
        });           
};




module.exports=Color;