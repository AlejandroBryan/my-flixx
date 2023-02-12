import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Users from './models/usersModel';
import { Strategy, ExtractJwt } from 'passport-jwt';

passport.use(
  new LocalStrategy({ usernameField: 'Username', passwordField: 'Password' }, (username, password, done) => {
    Users.findOne({ Username: username }, (error, user) => {
      if (error) {
        return done(error);
      }
      console.log(user);

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }),
);

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error);
        });
    },
  ),
);
