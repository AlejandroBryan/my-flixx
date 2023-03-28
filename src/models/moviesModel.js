import { Schema, model } from 'mongoose';

let moviesSchema = new Schema({
  Title: { type: String, required: true, unique: true },
  Description: { type: String, required: true },
  Released_year: { type: String, required: false },
  Runtime: String,
  Genres: [{ type: Schema.Types.ObjectId, ref: 'Genres' }],
  Director: [
    {
      Name: String,
      Biography: String,
      Birth: Date,
      Death: Date,
    },
  ],
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

export default model('Movies', moviesSchema);
