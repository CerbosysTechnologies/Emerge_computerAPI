const pool = require("../../dbconnection/config.js");

var K_mouse = function (K_mouse, files) {
    this.id = K_mouse.id;
    K_mouse.image = files;
    this.k_mouse_brand_name = K_mouse.k_mouse_brand_name;
    this.k_mouse_buy_at = K_mouse.k_mouse_buy_at;
    this.k_mouse_rent_at = K_mouse.k_mouse_rent_at;
    this.description = K_mouse.description;
    this.highlight_1 = K_mouse.highlight_1;
    this.status_id =K_mouse.status_id;
    this.createdById = K_mouse.createdById;
    this.creation_Date = K_mouse.creation_Date;
    this.modifiedById =K_mouse.modifiedById;
    this.modificationDate = K_mouse.modificationDate;
  };

//.................for add keyboard and mouse....................................................................
K_mouse.addmouse = function (data, mousedata, result) {
    console.log(data);
    pool.query(
      `insert into K_mouse set id='${mousedata.id}',k_mouse_brand_name='${mousedata.k_mouse_brand_name}',k_mouse_buy_at='${mousedata.k_mouse_buy_at}',description='${mousedata.description}',highlight_1='${mousedata.highlight_1}',k_mouse_rent_at='${mousedata.k_mouse_rent_at}' ,image='${data}'`,
      function (err, res) {
        if (err) result(null, err);
        else result(null, res);
      }
    );
  };
  //..............................................................................................................
K_mouse.getALLmouse= (result)=>{
   pool.query("SELECT * from k_mouse",(err,res)=>{
    if(err){
        console.log("err while fetching data",err);
        result(null,err);
    }
    else{
        console.log("mouse details fetching sucessfully");
        result(null,res);
    }
   }) ;
};
//..............................................
//..............................get all monitor by di..................

K_mouse.getmouseById = (id, result) => {
    pool.query("SELECT * FROM k_mouse WHERE id=?",
      [id],
      (err, res) => {
        if (err) {
          console.log("error while fetching the mouse and keyborad by id", err);
          result(err, null);
        } else {
          console.log("respons ", res);
          result(null, res);
        }
      }
    );
  };
  ///////////////////////////////////////////////////////////////////////////////////
  

  //........................................update monitor details........................

K_mouse.updateMouse = (id, mousedata, data, result) => {
    pool.query(
      "update k_mouse set k_mouse_brand_name=?,k_mouse_buy_at=?,description=?,highlight_1=?,k_mouse_rent_at=?,image=? where id=?",
      (value = [
        mousedata.k_mouse_brand_name,
        mousedata.k_mouse_buy_at,
        mousedata.description,
        mousedata.highlight_1,
        mousedata.k_mouse_rent_at,
        data,
        id,
      ]),
      function (err, res) {
        if (err)
        {
            console.log("err while update mouse");
            result(null, err);
        }        
        
        else
        {
            result(null, res);
            console.log(" update sucess mouse");

        } 
      }
    );
  };
  





module.exports= K_mouse;