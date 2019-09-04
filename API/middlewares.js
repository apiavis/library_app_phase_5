const { verifyJWTToken } = require('./libs/auth');

module.exports = {
  verifyJWT_MW: function(req, res, next) {
    let token = req.headers['x-access-token'];

    verifyJWTToken(token)
      .then((decodedToken) => {
        req.user = decodedToken.data;
        next();
      })
      .catch((err) => {
        res.status(403).json({ auth: false, token: null, message: 'Invalid auth token provided.' });
      });
  }
};
