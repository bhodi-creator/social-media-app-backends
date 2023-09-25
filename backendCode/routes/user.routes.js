const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel}=require("../model/users.model")
const userRoutes=express.Router()

userRoutes.post("/register",async(req,res)=>{
    const {email,pass,username,gender}=req.body;
    console.log(email,pass,username,gender)
try{
bcrypt.hash(pass, 5, async(err, hash)=> {
   const user=new UserModel({email,username,pass:hash,gender})
   await user.save()
   res.status(200).send({"msg":"A new user has been registered"})
});

}catch(err){
    res.status(400).send({"error":err})
}
})

userRoutes.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    
    try{
        const user=await UserModel.findOne({email});
        if(user){
        bcrypt.compare(pass, user.pass, async(err, result)=> {
            // result == true
            if(result){
                const token=jwt.sign({userId:user._id,username:user.username},"masai");
                res.status(200).send({"msg":"Login Successfull!","token":token})
            }else{
                res.status(200).send({"msg":"Wrong credential"})
            }
        });
    }else{
        res.status(401).send({ "msg": "User not found" });
    }

    }catch(err){
        res.status(400).send({"error":err})
    }
})

module.exports={
    userRoutes
}
