const {create ,getusers,getuserbyid,updateuser,deleteuser,getuserbyEmail}=require('../api/users/user.service');
const { getConnection } = require('../config/database');
const {genSaltSync,hashSync,compareSync}=require("bcrypt");
const  {sign}=require('jsonwebtoken');

module.exports={
    createUser:(req,res)=>{
        const body=req.body;
        console.log(body);
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        });
    },
    getUserbyUserId:(req,res)=>{
        const id=req.params.id;
        getuserbyid(id,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"database connection error"
                });

            }
            if(!results){
                return res.status(200).json({
                    success:0,
                    message:"record not found"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })

        })

    },

    getUser:(req,res)=>{
        getusers((err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            });

        })
    },
    
    updateUserById:(req,res)=>{
        const body=req.body;
        console.log(body);
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        
        updateuser(body,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success:0,
                message:"database connection error"
            });
        }

        if(!results){
            return res.status(200).json({
                success:0,
                message:"failed to update user"
            })
        }
        return res.status(200).json({
            success:1,
            message:"updated successfully",
            data:results
        })

    });
    },

    deleteUser:(req,res)=>{
const data=req.body;
deleteuser(data,(err,results)=>{
    if(err){
        console.log(err);
        return res.status(500).json({
            success:0,
            message:"database connection error"
        });
    }
    if(!results){
        return res.status(200).json({
            success:0,
            message:"record not found"
        })
    }
    return res.status(200).json({
        success:1,
        message:"user deleted successfully"
    })

})
    },
    
    login:(req,res)=>{
        const body=req.body;
        getuserbyEmail(body.email,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"database connection error"
                });
            }
            if(!results){
                return res.status(200).json({
                    success:0,
                    message:"invalid email or password"
                });  
            }
            const result=compareSync(body.password,results.password);
            console.log(result);
            if(result){
                //do not want to send password to jsonwebtoken
                results.password=undefined;
                const jsontoken=sign({result:results},"test1234",{expiresIn:"1h"});
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsontoken
                })

            }else{
                return res.json({
                    success:0,
                    message:"invalid user or password",
                }) 
            }
        })
    }
}