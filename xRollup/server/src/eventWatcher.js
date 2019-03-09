module.exports = class EventWatcher {
    constructor(logService, contractService, stateManager) {
        this.logService = logService;
        this.contractService = contractService;
        this.stateManager = stateManager;
    }

    subscribeToBlocks(callback) {
        const subscription = this.contractService.getWeb3().eth.subscribe('newBlockHeaders', (error, blockHeader) => {
            if (error) return console.error(error);
            
            console.log('Successfully subscribed!', blockHeader);
            }).on('data', (blockHeader) => {
            // console.log('data: ', blockHeader);
            });
    }

    getPastEvents(callback) {
        this.contractService.getMainContract().getPastEvents('Deposit', {
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => { console.log(events); })
        .then((events) => {
            console.log(events) // same results as the optional callback above
        });
    }

    subscribeToDeposit(callback) {
        this.contractService.getMainContract().events.Deposit({
            fromBlock: 0
        }, (error, event) => { 
            // console.log(event); 
        })
        .on('data', (event) => {
            this.logService.info('[Ethereum] Deposit', {});
            console.log('Deposit', event.returnValues);

            this.stateManager.deposit({
                publicKey: event.publicKey,
                ethereumAddress: event.user,
                tokenId: event.token,
                amount: event.amount,
            });
        })
        .on('changed', (event) => {
            // remove event from local database
        })
        .on('error', console.error);

    }

    subscribeToKeyRegistration(callback) {
        this.contractService.getMainContract().events.KeyRegistered({
            fromBlock: 0
        }, (error, event) => { 
            // console.log(event); 
        })
        .on('data', (event) => {
            this.logService.info('[Ethereum] Key Registration', {});
            console.log(event); // same results as the optional callback above
        })
        .on('changed', (event) => {
            // remove event from local database
        })
        .on('error', console.error);
    }

    subscribeToStateChanges(callback) {
        this.logService.info('[Ethereum] State Change', {});
        return this;
    }

}