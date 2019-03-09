// External Packages
const express = require('express')
const app = express()
const winston = require('winston')
const Web3 = require('web3');

//Internal Services
const EventWatcher = require('./eventWatcher');
const StateManager = require('./stateManager');
const LogService = require('./logService');
const ContractService = require('./contractService');

const port = 3000;

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));

    const files = new winston.transports.File({ filename: 'logfile.log' });
  const myconsole = new winston.transports.Console();

  winston.add(myconsole);
  winston.add(files);

// subscription.unsubscribe((error, success) => {
// if (error) return console.error(error);

// console.log('Successfully unsubscribed!');
// });

// Initialize Services
const logService = new LogService(winston);
const stateManager = new StateManager(logService);
const contractService = new ContractService(web3, stateManager);
const eventWatcher = new EventWatcher(web3, logService, contractService);

eventWatcher.subscribeToBlocks(null);
eventWatcher.subscribeToDeposit(null);

const bodyParser = require('body-parser');
app.use(bodyParser);

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/api/transfer', (req, res) => {
    console.log("Transfer Request")
    console.log(req.body);

    const pubKey = req.body.pubKey;
    const signature = req.body.signature;

    // Transaction Data
    const nonce = req.body.nonce;
    const recipient = req.body.recipient;
    const amount = req.body.amount;
})
app.post('/api/withdraw', (req, res) => {
    console.log("Withdraw Request")
    console.log(req.body);
    
    const pubKey = req.body.pubKey;
    const signature = req.body.signature;

    // Transaction Data
    const nonce = req.body.nonce;
    const amount = req.body.amount;
})
app.get('/api/state', (req, res) => res.send('Current State!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))