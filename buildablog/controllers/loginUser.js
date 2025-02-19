const bcrypt= require('bcrypt')

const User=require('../database/models/User')

module.exports=(req,res)=>{
    console.log(req.body)
    const { email,password}=req.body;
    
    //try to find the user
    
    User.findOne({email},(error,user)=>{
        if (user){
            //compare passwords.
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same){
                    //store user session.
                    req.session.userId=user._id
                    res.redirect('/')
                }
                else{
                    res.redirect('/auth/login')
                }
            })
    }else{
        return res.redirect('/auth/login')
    }
    
})
//steps
//compare user password.

//if user password is correct,then login user
//else
//redirect user back.
}