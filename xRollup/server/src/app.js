// External Packages
const winston = require('winston')
const Web3 = require('web3');
var HDWalletProvider = require("truffle-hdwallet-provider");
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
const privKey = require('./config').privKey;

// We have 2 web3 because you need websocket for subscriptions, but I don't know how to use mnemonic keys w/ websocket provider...
var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
const account = web3.eth.accounts.privateKeyToAccount(privKey);
console.log(account);

const logService = new LogService(winston);
const contractService = new ContractService(web3);
const stateManager = new StateManager(logService, contractService);
const eventWatcher = new EventWatcher(logService, contractService);

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
    },
    eth_sendTransaction: function (args, callback) {
        let result = "";
        const params = args[1];
        switch (args[0]) {
            case "transfer":
                result = "transfer";
                stateManager.transfer({
                    to: params.to,
                    from: params.from, 
                    tokenId: params.tokenId,
                    amount: params.amount,
                    signature: params.signature, 
                    nonce: params.nonce,
                });
                break;
            case "deposit":
                result = "transfer";
                stateManager.transfer({
                    publicKey: params['publicKey'],
                    ethereumAddress: params['ethereumAddress'],
                    tokenId: params['tokenId'],
                    amount: params['amount'],
                    signature: params['signature'],
                    nonce: params['nonce'],
                };
                break;
            default:
                result = "unknown";
                break;
        }

        callback(null, result);
    },
    eth_call: function (args, callback) {
        let result = "";
        switch (args[0]) {
            case "getState":
                result = stateManager.getState();
                break;
            default:
                result = "unknown";
                break;
        }

        callback(null, result);
    },
});

server.http().listen(PORT);

// Create Client
var client = jayson.client.http({
    port: PORT
});

client.request('eth_sendTransaction', ["deposit", {
}], function (err, response) {
    if (err) throw err;
    console.log(response.result); // 2
});

client.request('eth_call', ["getState"], function (err, response) {
    if (err) throw err;
    console.log(response.result); // 2
});