module.exports = class EventWatcher {
    constructor(logService, contractService) {
        this.logService = logService;
        this.contractService = contractService;
        // const mainInterface = require('../build/contracts/Main.json');
        // const deployedAddress = '0x0';
        // this.mainContract = new this.web3.eth.Contract(mainInterface.abi,deployedAddress);
    }

    subscribeToBlocks(callback) {
        const subscription = this.contractService.getWeb3().eth.subscribe('newBlockHeaders', (error, blockHeader) => {
            if (error) return console.error(error);
            
            console.log('Successfully subscribed!', blockHeader);
            }).on('data', (blockHeader) => {
            console.log('data: ', blockHeader);
            });
    }

    subscribeToDeposit(callback) {
        this.logService.info('[Ethereum] Deposit Found', {});
        return this;
    }

    subscribeToStateChanges(callback) {
        this.logService.info('[Ethereum] State Change', {});
        return this;
    }

}