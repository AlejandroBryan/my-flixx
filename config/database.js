import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const databaseUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/my-flixDB';

const connect_db = async () => {
  mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to DB!'))
    .catch((err) => {
      console.error('error connecting to ' + err.message);
      process.exit(1);
    });
};

export default connect_db;
