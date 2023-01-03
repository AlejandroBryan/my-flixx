import express from 'express';
import morgan from 'morgan';
import exceptionHandler from './utils/exceptions/exceptionHandler';
import moviesRoute from './api/routes/index';

//console.log(express);
const app = express();

// require your built in module

// invoking middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to to the Movie-Api </h1> <a href="/documentation.html"> Documentation </a>');
});

app.use('/api/v1/movies', moviesRoute);
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
  next();
});

export default app;
