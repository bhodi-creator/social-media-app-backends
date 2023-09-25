const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    divice:String
    
},{
    versionKey:false
})

const postModel=mongoose.model("note",postSchema);
module.exports={
    postModel
}