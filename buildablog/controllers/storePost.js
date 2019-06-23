const path=require('path')
const Post= require('../database/models/Post')
const cloudinary = require('cloudinary');

module.exports = (req, res) => {

        //console.log(req.body)

        //Image upload with express
        //console.log(req.files)

        const {image} = req.files
        //here .. is used to move in different directory

        const uploadPath = path.resolve(__dirname, '..', 'public/posts', image.name);

//saving posts to database

        image.mv(uploadPath, (error) => {
// then to cloudinary
        cloudinary.v2.uploader.upload(uploadPath,(error,result)=>{
        if(error){
            console.log('sorry error occur');
            return res.redirect('/');
        }
        Post.create({
                ...req.body,
                //image: `/posts/${image.name}`,
                image:result.secure_url,
                author: req.session.userId
            }, (error, post) => {
                console.log(post);
                res.redirect('/');
            });
    });
    })
    }