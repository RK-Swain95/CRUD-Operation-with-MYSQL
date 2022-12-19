const{verify}=require("jsonwebtoken");




module.exports={
    checktoken:(req,res,next)=>{
      let token=req.get("Authorization");
      if(!token){
       return res.json({
        success:0,
        message:"Access denied !"

        })
      }else{
        token=token.slice(7);
        verify(token,"test1234",(err,decoded)=>{
            if(err){
                return res.json({
                    success:0,
                    message:"invalid token"
                })
            }else{
                next();
            }
        })
      }
    }
}