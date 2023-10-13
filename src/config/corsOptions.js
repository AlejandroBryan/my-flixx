let allowedOrigins = [
  'http://localhost:1234',
  'https://myflixx.netlify.app',
  'http://localhost:4200',
  'https://alejandrobryan.com',
  'http://my-flixx-images-bucket.s3.eu-central-1.amazonaws.com',
];
export default {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
};
