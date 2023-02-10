import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Users from './models/usersModel';
import { Strategy, ExtractJwt } from 'passport-jwt';

passport.use(
  new LocalStrategy({ usernameField: 'Username', passwordField: 'Password' }, (username, password, callback) => {
    Users.findOne({ UserName: username }, (error, user) => {
      if (error) {
        return callback(error);
      }

      if (!user) {
        return callback(null, false, { message: 'Incorrect username.' });
      }

      if (!user.validatePassword(password)) {
        return callback(null, false, { message: 'Incorrect password.' });
      }

      return callback(null, user);
    });
  }),
);

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    },
  ),
);
