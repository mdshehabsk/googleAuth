

const checkAuth = (req, res, next) => {
  if(!req.user){
      res.redirect('/auth/google')
  }else{
      next()
  }
}

module.exports = checkAuth