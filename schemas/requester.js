import mongoose from 'mongoose';

const { Schema } = mongoose;
const requesterSchema = new Schema({
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
    enum: ['makingRequest', 'driverWaiting', 'loadingPackage', 'driverOnTrip', 'idle']
  },
  currentRequest: {
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  }
});

const Requester = mongoose.model('Requester', requesterSchema);
export default Requester;
