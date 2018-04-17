import mongoose from 'mongoose';
import Dispatcher from '../schemas/dispatcher';
// import Trip from '../schemas/trip';

/**
 *
 */
class DispatcherController {
  /**
   * @returns {null} This method returns nothing
   * @param {Object} dispatcher The driver whose location is to be saved
   */
  saveDriverLocation(dispatcher) {
    const { phone, lastLocation, rating } = dispatcher;
    Dispatcher.findOne({
      phone
    }, (err, foundDispatcher) => {
      if (!foundDispatcher) {
        this.saveDriver(dispatcher, (err, savedDispatcher) => {
  
        });
      } else {
        foundDispatcher.lastLocation = lastLocation;
        foundDispatcher.rating = rating || foundDispatcher.rating;
        foundDispatcher.save((err, savedDispatcher) => {
          // console.log('Saved Dispatcher', savedDispatcher, err);
          //
        });
      }
    });
  }
  /**
   * @returns {null} This method returns nothing
   * @param {Object} driver The driver to be saved
   * @param {Function} done Callback function. Takes error and saved driver.
   */
  saveDriver(driver, done) {
    this.me = 'me';
    const {
      name,
      phone,
      rating,
      lastLocation
    } = driver;
    const newDriver = new Dispatcher({
      name,
      isOnline: true,
      isOnTrip: false,
      phone,
      rating,
      lastLocation
    });
    newDriver.save((err, savedDriver) => {
      //
      done(err, savedDriver);
    });
  }
  /**
   * @returns {null} This method returns nothing
   */
  startTrip() {
    this.me = 'me';
    const newTrip = new Trip({
      
    });
  }
}

export default new DispatcherController();
