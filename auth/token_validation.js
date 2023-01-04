const {verify}=require('jsonwebtoken')
module.exports={
    chechkToken:(req,res,next)=>{
        let token=req.get("authorization");
        if(token){
            token=token.slice(7)
            verify(token,"12345",(err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        status:401,
                        message:"invalid token"

                    });
                }else{
                    next();
                }
            })

        }
        else{
            res.json({
                success:0,
                status:401,
                message:"access denied!  unauthorized user"
            })
        }
    }
}