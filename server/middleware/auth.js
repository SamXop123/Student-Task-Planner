const admin = require('../config/firebaseAdmin');


const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const err = new Error('Authorization token missing');
      err.status = 401;
      return next(err);
    }

    const token = authHeader.split('Bearer ')[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || null
    };

    next();
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      error.status = 401;
      error.message = 'Token expired. Please log in again.';
    } else if (error.code?.startsWith('auth/')) {
      error.status = 401;
      error.message = 'Invalid or expired token';
    } else if (!error.status) {
      error.status = 401;
      error.message = 'Unauthorized';
    }

    next(error);
  }
};

module.exports = authenticate;

