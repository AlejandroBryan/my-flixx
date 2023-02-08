import express from 'express';
import morgan from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import ejs from 'ejs';
import engine from 'ejs-mate';
import cors from 'cors';
import { check, validationResult } from 'express-validator';
import connect_db from '../config/database';
import exceptionHandler from './utils/exceptions/exceptionHandler';
import moviesRoute from './api/routes/moviesRoute';
import usersRoute from './api/routes/usersRoute';
import genresRoute from './api/routes/genresRoute';
import directorsRoute from './api/routes/directorsRoute';

import docuRoute from './web/routes/docuRoute';

const app = express();
//connect to the database
connect_db();
// require your built in module

let allowedOrigins = ['http://localhost:5000', 'http://testsite.com'];
// invoking middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(express.static('./public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
import auth from './auth';
auth(app);
import passport from 'passport';
import './passport';
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to My-flix </h1> ${'\n'} <a  href="documentation.html">Documentation</a`);
});

// invoking api routes
app.use('/api/v1/movies', passport.authenticate('jwt', { session: false }), moviesRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/genres', passport.authenticate('jwt', { session: false }), genresRoute);
app.use('/api/v1/directors', passport.authenticate('jwt', { session: false }), directorsRoute);

// invoking web routes
//app.use('/', docuRoute);

app.all('*', (req, res, next) => {
  next(new exceptionHandler(404, `The url ${req.originalUrl} could't be not found on this server`));
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Oh No, Something Went Wrong!';
  res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
  //console.error(err);
  next();
});

export default app;
