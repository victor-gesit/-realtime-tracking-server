import mongoose from 'mongoose';

const { Schema } = mongoose;
const tripSchema = new Schema({
  dispatcher: {
    type: Schema.Types.ObjectId,
    ref: 'Dispatcher',
    required: true
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'Requester',
    required: true
  },
  startPoint: {
    long: Number,
    latitude: Number
  },
  endPoint: {
    long: Number,
    latitude: Number
  },
  tripTime: {
    type: Number
  },
  rating: {
    type: Number,
    required: true
  },
  cost: {
    type: Number
  },
  lastLocation: {
    long: Number,
    lat: Number
  },
  courierType: {
    type: String,
    enum: ['dispatchRider', 'deliveryTruck', 'deliveryMan']
  },
  state: {
    type: String,
    enum: ['completed', 'started', 'dispatcherEnRoute']
  }
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
