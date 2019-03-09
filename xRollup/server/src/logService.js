/* 
    Log Service
    Similar to Ethereum events for our state.
*/

module.exports = class LogService {
    constructor(winston) {
        this.winston = winston;
        this.winston.log('info', 'Log Service Created', {
            someKey: 'some-value'
          })
    }

    info(message, params) {
        this.winston.log('info', message, params);
    }
}