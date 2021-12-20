const jwt = require('jsonwebtoken');

function checkTokenSetUser(req, res, next) {
  const authHeader = req.get('authorization');
  if(authHeader){
    const token = authHeader.split(' ')[1];
    if (token){
      // verify token
      jwt.verify(token, process.env.JWT_KEY, (error, user) => {
        if (error){
          res.status(401).json({
            status: 'Failed',
            message: 'Auth Failed',
          });
        } else {
          req.user = user
        }
        next();
      });
    } else {
      // no token in auth header
      next();
    }
  } else {
    // No authorization header
    next();
  }
}

//checks if user was set by checkTokenSetUser
function checkAuth(req, res, next) {
  if (req.user){
    // req has user continue
    next();
  } else {
    //req does not have user 
    res.status(401).json({
      status: 'Failed',
      message: 'Auth Failed',
    });
  }
}

module.exports = {
  checkTokenSetUser,
  checkAuth,
}