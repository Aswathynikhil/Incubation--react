const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User=require('../Modals/userModal')

const protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header
            token=req.headers.authorization.split(' ')[1]

            //verify token
            const decoded=jwt.verify(token,"abc1234")
            
            //Get user from the token
            req.user=await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
            
        }
    }

    if(!token){
        res.status(401)
        throw new Error('not authorized, no token')
    }
})

module.exports={protect}