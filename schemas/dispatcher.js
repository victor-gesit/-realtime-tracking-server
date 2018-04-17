import mongoose from 'mongoose';

const { Schema } = mongoose;
const dispatcherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  trips: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Trip' }]
  },
  rating: {
    type: Number,
    required: true
  },
  isOnline: Boolean,
  isOnTrip: Boolean,
  lastLocation: {
    long: Number,
    lat: Number
  },
  currentState: {
    type: String,
    enum: ['receivingRequest', 'waiting', 'loadingPackage', 'onTrip', 'idle']
  },
  plate: {
    type: String,
    required: true
  }
});

const Dispatcher = mongoose.model('Dispatcher', dispatcherSchema);
export default Dispatcher;
