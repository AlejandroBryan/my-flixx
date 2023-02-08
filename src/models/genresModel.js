import { Schema, model } from 'mongoose';

const genresSchema = new Schema({
  Name: { type: String, unique: true },
  Description: { type: String, unique: true },
  MoviesList: [{ type: Schema.Types.ObjectId, ref: 'Movies' }],
});

export default model('Genres', genresSchema);
