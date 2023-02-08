import { Schema, model } from 'mongoose';

let moviesSchema = new Schema({
  Title: { type: String, required: true, unique: true },
  Description: { type: String, required: true },
  Genre: [{ type: Schema.Types.ObjectId, ref: 'Genres' }],
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

export default model('Movies', moviesSchema);
