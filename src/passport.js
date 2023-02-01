import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Users from '../src/models/usersModel';
import { Strategy, ExtractJwt } from 'passport-jwt';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    (username, password, callback) => {
      //console.log('hello', username + '  ' + password);
      Users.findOne({ UserName: username }, (error, user) => {
        //console.log(user);
        if (error) {
          console.log(error);
          return callback(error);
        }
        // if the username can't be found
        if (!user) {
          //console.log('incorrect username');
          return callback(null, false, { message: 'Incorrect username.' });
        }

        //console.log('finished');
        return callback(null, user);
      });
    },
  ),
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
