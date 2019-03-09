// External Packages
const winston = require('winston')
const Web3 = require('web3');
var jayson = require('jayson');

// Internal Services
const EventWatcher = require('./eventWatcher');
const StateManager = require('./stateManager');
const LogService = require('./logService');
const ContractService = require('./contractService');

// ENV Variables
const PORT = 3000;

// Logging Setup
const files = new winston.transports.File({ filename: 'logfile.log' });
const myconsole = new winston.transports.Console();

winston.add(myconsole);
winston.add(files);

// subscription.unsubscribe((error, success) => {
// if (error) return console.error(error);

// console.log('Successfully unsubscribed!');
// });

// Initialize Services
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
const logService = new LogService(winston);
const stateManager = new StateManager(logService);
const contractService = new ContractService(web3, stateManager);
const eventWatcher = new EventWatcher(web3, logService, contractService);

eventWatcher.subscribeToBlocks(null);
eventWatcher.subscribeToDeposit(null);

/* 
    const pubKey = req.body.pubKey;
    const signature = req.body.signature;

    // Transaction Data
    const nonce = req.body.nonce;
    const recipient = req.body.recipient;
    const amount = req.body.amount;
*/

// Create Server
var server = jayson.server({
    add: function (args, callback) {
        callback(null, args[0] + args[1]);
    }
});

server.http().listen(PORT);

// Create Client
var client = jayson.client.http({
    port: PORT
  });
  
  // invoke "add"
  client.request('add', [1, 1], function(err, response) {
    if(err) throw err;
    console.log(response.result); // 2
  });