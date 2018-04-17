/* eslint class-methods-use-this: 0 */

import Dispatcher from '../schemas/dispatcher';
// import Trip from '../schemas/trip';

/**
 *
 */
class RequesterController {
  /**
   * @returns {null} This method returns nothing
   * @param {Object} req The request object
   * @param {Object} res The response object
   */
  requestDispatcherREST(req, res) {
    Dispatcher.findOne({ phone: '07069749945' }, (err, dispatcher) => {
      if (dispatcher) {
        return res.status(200).send({
          message: 'Dispatcher found',
          success: true,
          dispatcher
        });

      }

      return res.status(404).send({
        message: 'Dispatcher not found',
        success: false
      });
    });
  }
  /**
   * @returns {null} This method returns nothing
   * @param {Object} data Data about the requester
   * @param {Object} done Callback function
   */
  requestDispatcher(data, done) {
    Dispatcher.findOne({ phone: '07069749945' }, (err, dispatcher) => {
      if (dispatcher) {
        return done(null, dispatcher);
      }
      return done({ message: 'No dispatcher found', });
    });
  }
}

export default new RequesterController();
