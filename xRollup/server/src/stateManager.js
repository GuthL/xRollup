module.exports = class StateManager {
    constructor(logService) {
        this.state = 0;
        this.logService = logService;
    }
    getState() {
        return this.state;
    }

    setState(newState) {
        const success = true;
        //TODO: Input validation
        const oldState = this.state;
        this.state = newState;

        if (success) {
            this.logService.info('StateUpdated', {
                oldState: oldState,
                newState: newState,
            });
        } else {
            this.logService.info('StateUpdateFailed', {
                oldState: oldState,
                newState: newState,
            });
        }
        
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