const jwt=require('jsonwebtoken');
const asyncHandler=require('../utils/asyncHandler');
const ApiError=require('../utils/ApiError');
const User=require('../models/User.model');

const protect=asyncHandler(async(req,res)=>{
    let token;
    if(req.headers.authorization?.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        throw new ApiError(401,'Not authorized,no token');
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET); 
        req.user=await User.findById(decoded.id).select('-password');
        if(!req.user) throw new ApiError(401,'User not exists');
        next();
    }
    catch(error){
        throw new ApiError(401,'not Authorized,token failed');
    }
});
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, `Role '${req.user.role}' not allowed`);
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };