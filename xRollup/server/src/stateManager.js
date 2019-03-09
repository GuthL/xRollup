module.exports = class StateManager {
    constructor(logService) {
        this.state = 0;
        this.logService = logService;
    }
    transfer(tokenId, to, from, amount) {
        //TODO: Save transfer to state
        this.logService.info('Transfer', {
            tokenId: tokenId,
            to: to,
            from: from,
            amount: amount,
        });
    }

    withdraw(tokenId, to, amount) {
        //TODO: Save withdraw to state
        this.logService.info('Withdraw', {
            tokenId: tokenId,
            to: to,
            amount: amount,
        });
    }

    deposit(tokenId, from, amount) {
        this.logService.info('Deposit', {
            tokenId: tokenId,
            from: from,
            amount: amount,
        });
    }

}