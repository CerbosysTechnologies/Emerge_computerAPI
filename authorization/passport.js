const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require('./config');
const jwt=require('jsonwebtoken');
 

module.exports=function(passport){
    let opts={};
    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken(); 
    opts.secretOrKey="emergecomputer";
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        console.log('Type=>', jwt_payload.type);
        console.log("JWT ID=>", jwt_payload.ad_id);
        console.log("JWT Password=>", jwt_payload.email);

    
        if(jwt_payload.type == 'admin'){
            pool.query('SELECT * FROM admin WHERE ad_id = ' 
            +jwt_payload.ad_id+ ' AND email = "' + jwt_payload.email +'"', function(err,result)
            {
                if(err){
                    console.log("PassportTest1");
                    return done(err,false,{ message: 'Invalid token.' });                
                }
                else if(result){
                    console.log("PassportTest2");
                    return done(null,result); 
                }
                else{
                    console.log("PassportTest3");
                    return done(null,false, { message: 'Invalid request.' });
                }
            });

        }

    }))

}

