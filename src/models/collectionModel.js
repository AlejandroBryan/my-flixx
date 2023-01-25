import { Schema, ObjectId, model } from 'mongoose';

const collectionSchema = new Schema({
  Collection: String,
  Description: String,
  MethodGET: {
    Name: String,
    Url: String,
    Description: String,
  },
  MethodPOST: {
    Name: String,
    Url: String,
    Description: String,
  },
  MethodPUT: {
    Name: String,
    Url: String,
    Description: String,
  },
  MethodDELETE: {
    Name: String,
    Url: String,
    Description: String,
  },
});

export default model('Collection', collectionSchema);
