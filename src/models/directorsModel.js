import { Schema, model } from 'mongoose';
const directorsSchema = new Schema({
  Name: String,
  Biography: String,
  Birth: Date,
  Death: Date,
  Directing: [{ type: Schema.Types.ObjectId, ref: 'Movies' }],
});

export default model('Directors', directorsSchema);
