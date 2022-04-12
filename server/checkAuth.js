

const isAuth = (req,res,next) => {
    if(req.session.isAuth){
        next()
    }else{
        res.status(202).json('please login')
    }
}


module.exports = isAuth