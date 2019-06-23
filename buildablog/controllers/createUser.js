module.exports=(req,res)=>{
    //console.log(req.flash('data'))
    
    //console.log(req.session.registrationErrors)
    res.render('register',{
        // errors:req.session.registrationErrors
        errors: req.flash('registrationErrors'),
        data:req.flash('data')[0]
    })
}