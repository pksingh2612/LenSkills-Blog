const mongoose =require('mongoose')
const PostSchema=new mongoose.Schema({
    title:String,
    subtitle:String,
    content:String,
    //content: mongoose.Schema.Types.String,
    //username:String,

    //Relating post collection with user collection

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    //Saving uplaod images to database
    image:String,
    createdAt:
    {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post',PostSchema);

module.exports=Post
