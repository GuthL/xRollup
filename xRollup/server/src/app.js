// External Packages
const winston = require('winston')
const Web3 = require('web3');
var HDWalletProvider = require("truffle-hdwallet-provider");
var jayson = require('jayson');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

// Internal Services
const EventWatcher = require('./eventWatcher');
const StateManager = require('./stateManager');
const LogService = require('./logService');
const ContractService = require('./contractService');

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
const privKey = process.env.WALLET_PRIVKEY;

// We have 2 web3 because you need websocket for subscriptions, but I don't know how to use mnemonic keys w/ websocket provider...
var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'));
const account = web3.eth.accounts.privateKeyToAccount(privKey);
console.log(account);

const logService = new LogService(winston);
const contractService = new ContractService(web3);
const stateManager = new StateManager(logService, contractService);
const eventWatcher = new EventWatcher(logService, contractService, stateManager);

eventWatcher.subscribeToBlocks(null);
// eventWatcher.getPastEvents(null);
eventWatcher.subscribeToDeposit(null);
eventWatcher.subscribeToKeyRegistration(null);

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
                    pubkey: params.pubkey,
                    token_balance_from: params.token_balance_from,
                    nonce: params.nonce,
                    token_type: params.token_type,
                    amount: params.amount,
                    to: params.to,
                    token_balance_to: params.token_balance_to,
                    nonce_to: params.nonce_to,
                    token_type_to: params.token_type_to,
                    msg: params.msg,
                    R8x: params.R8x,
                    R8y: params.R8y,
                    S: params.S
                });
                break;
            default:
                result = "unknown";
                break;
        }

        callback(null, result);
    },
    eth_call: function (args, callback) {
        let result = "";
        const params = args[1];
        switch (args[0]) {
            case "getState":
                result = stateManager.getState();
                break;
            case "getBalance":
                result = stateManager.getTokenBalance({
                    publicKey: params.pubkey,
                    token: params.token_type,
                });
                break;
            default:
                result = "unknown";
                break;
        }

        callback(null, result);
    },
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

server.http().listen(port);

// Create Client
var client = jayson.client.http({
    port: port
});