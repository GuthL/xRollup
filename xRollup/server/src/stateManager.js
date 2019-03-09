module.exports = class StateManager {
    constructor(logService, contractService) {
        this.stateRoot = 0;
        this.logService = logService;
        this.contractService = contractService;

        this.addressToPublicKeyMapping = {};
    }

    setPublicKey(address, publicKey) {
        this.addressToPublicKeyMapping[address] = publicKey;
    }

    getPublicKey(address) {
        return this.addressToPublicKeyMapping[address] || null;
    }

    getState() {
        return this.stateRoot;
    }

    setState(newState) {
        const success = true;
        //TODO: Input validation
        const oldState = this.stateRoot;
        this.stateRoot = newState;

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

        // Generate proof & new state
        const proof = "0";
        const newState = "0";

        // Push to contract
        this.contractService.withdrawToken(tokenId, to, amount, proof, newState);

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