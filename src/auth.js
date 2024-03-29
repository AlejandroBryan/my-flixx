import 'dotenv/config';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import './passport';

const jwtSecret = process.env.JWT_SECRET;

const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256',
  });
};

//  POST login
export default (router) => {
  router.post('/api/v1/users/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Please check your username and password',
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({
          user,
          token,
          message: `User has been successfully login`,
        });
      });
    })(req, res);
  });
};
