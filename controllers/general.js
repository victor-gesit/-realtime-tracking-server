/* eslint class-methods-use-this: 0 */

import mongoose from 'mongoose';
import Dispatcher from '../schemas/dispatcher';

/**
 *
 */
class GeneralController {
  /**
   * @returns {null} This method returns nothing
   * @param {Object} req The request object
   * @param {Object} res The response object
   */
  signIn(req, res) {
    const { phone } = req.body;
    console.log('Phone Number Supplied: ', phone, req.body);
    return res.status(200).send({
      message: `Code sent to ${phone}`,
      success: true
    });
  }
  /**
   * @returns {null} This method returns nothing
   * @param {Object} req The request object
   * @param {Object} res The response object
   */
  verifyCode(req, res) {
    const { code } = req.body;
    console.log('Phone Number Supplied: ', code, req.body);
    return res.status(200).send({
      message: 'Sign in successful',
      success: true
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
      console.log(err);
    });
  }
}

export default new GeneralController();
