//handling user registration
const User=require('../database/models/User')

module.exports=(req,res)=>{

User.create(req.body, (error, user)=>{
    if(error){
        //Displaying validation errors
        //console.log(error)
        // console.log(error.errors) 
        //console.log(Object.keys(error.errors))
        //console.log(Object.keys(error.errors).map(key=>error.errors[key].message))
        const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        
            // req.session.registrationErrors=registrationErrors
        req.flash('registrationErrors', registrationErrors)
//Persist request data on form
        req.flash('data',req.body)

        return res.redirect('/auth/register')
    }
    res.redirect('/')
})
}