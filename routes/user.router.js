const { updateuser } = require('../api/users/user.service');
const {createUser,updateUserById,getUser,getUserbyUserId,deleteUser,login}=require('../controllers/user.controller');
const router=require("express").Router();
const {checktoken}=require('../auth/token_validation');
router.post('/users',createUser);
router.get('/getusers',checktoken,getUser);
router.get('/getuserbyid/:id',checktoken,getUserbyUserId);
router.post('/update',checktoken,updateUserById);
router.delete('/delete',deleteUser);
router.post('/login',login);


module.exports=router;