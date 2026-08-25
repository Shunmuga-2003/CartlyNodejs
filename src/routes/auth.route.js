const express=require('express');
const router=express.router();
const {registerUser,loginUser,getMe}=require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.mddleware');


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me',protect,getMe);
module.exports=router;