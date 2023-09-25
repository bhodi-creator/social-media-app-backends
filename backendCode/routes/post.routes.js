const express=require("express")
const {PostModel}=require("../model/post.model")
const {auth}=require("../middilware/auth.middleware")
const postRoutes=express.Router()

postRoutes.use(auth)

postRoutes.post("/create",async(req,res)=>{
    const payload=req.body
    console.log(payload)
    try{
        const post=new PostModel(payload);
        await post.save();
        res.status(200).send({"msg":"new post has been added"})
    }catch(err){
        res.status(400).send({"error":err})
    }  
})

postRoutes.get('/get', async (req, res) => {
    const { userId } = req.body;
    const { device } = req.query; // Get the 'device' query parameter
    let query = { userId }; // Initialize query with userId

    // If 'device' query parameter is provided, add it to the query
    if (device) {
        query.device = device;
    }

    try {
        const posts = await PostModel.find(query);
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ "error": err.message });
    }
});

postRoutes.get("/get",async(req,res)=>{
    const post= await PostModel.find({userId:req.body.userId});
    res.status(200).send(post)
})

postRoutes.get("/get/:id",async(req,res)=>{
    const post= await PostModel.find({userId:req.body.userId,_id:req.params.id});
    res.status(200).send(post)
})

postRoutes.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params;
    const post=await PostModel.findOne({_id:id})
    console.log(post)
    try{
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({post})

        
    }catch(err){
        res.status(400).send({"error":err})
    }
})

postRoutes.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
   const post=await PostModel.findOne({_id:id})
   console.log(post)
    try{
        if(req.body.userId!==post.userId){
            res.status(400).send({"error":"you are not authorized"})
        }else{
            await postModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"post deleted"})
        }
    }catch(err){
        res.status(400).send({"error":err})
    }
})
module.exports={
    postRoutes
}