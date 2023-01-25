import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  UserName: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Birthday: Date,
  FavoriteMovies: [{ type: Schema.Types.ObjectId, ref: 'Movies' }],
});

export default model('Users', userSchema);
