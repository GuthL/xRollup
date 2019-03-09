module.exports = class StateManager {
    constructor(logService, contractService) {
        this.stateRoot = 0;
        this.logService = logService;
        this.contractService = contractService;

        this.addressToPublicKeyMapping = {};
        this.nonces = {};
        this.tokenBalances = {};

        var data = {
            pubkey: "",
            token_balance_from: "",
            nonce: "",
            token_type: "",
            amount: "",
            to: "",
            token_balance_to: "",
            nonce_to: "",
            token_type_to: "",
            msg: "",
            R8x: "",
            R8y: "",
            S: ""
        }
    }

    setPublicKey(address, publicKey) {
        this.addressToPublicKeyMapping[address] = publicKey;
        this.nonces[publicKey] = 0;
    }

    getPublicKey(address) {
        return this.addressToPublicKeyMapping[address] || null;
    }

    setNonce(publicKey, nonce) {
        this.nonces[publicKey] = nonce;
    }

    getNonce(publicKey) {
        return this.nonces[publicKey] || 0;
    }

    setTokenBalance(publicKey, token, amount) {
        if (!this.tokenBalances[publicKey]) {
            this.tokenBalances[publicKey] = {};
        }
        this.tokenBalances[publicKey][token] = amount;
    }

    getTokenBalance(publicKey, token) {
        return this.tokenBalances[publicKey][token] || 0;
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

    /*
        Token Transfer

        Params:
            pubkey
            token_balance_from
            nonce
            token_type
            amount
            to
            token_balance_to
            nonce_to
            token_type_to
            msg
            R8x
            R8y
            S
    */

    transfer(params) {
        // TODO: Check if sender and reciever are in state
        // TODO: Verify signature

        // Transfer Balance
        const senderBalance = getTokenBalance(params.pubkey, params.token_type);
        const recipientBalance = getTokenBalance(params.to, params.token_type);

        if (params.amount > senderBalance) {
            throw new Error("Insufficent Balance", params.token_type, params.to, params.pubkey, params.amount);
        }

        senderBalance -= params.amount;
        recipientBalance += params.amount;

        setTokenBalance(from, tokenId, senderBalance);
        setTokenBalance(to, tokenId, recipientBalance);

        // Compute Merkel Root

        this.logService.info('Transfer', {
            tokenId: params.token_type,
            to: params.to,
            from: params.pubkey,
            amount: params.amount,
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

    deposit(params) {
        const publicKey = params['publicKey'];
        const ethereumAddress = params['ethereumAddress'];
        const tokenId = params['tokenId'];
        const amount = params['amount'];

        // Create an entry for this user if new 
        if (!this.getPublicKey(ethereumAddress)) {
            this.setPublicKey(ethereumAddress, publicKey);
        }

        this.setTokenBalance(publicKey, tokenId, amount);

        //Compute Merkel Root

        this.logService.info('Deposit', {
            tokenId: tokenId,
            from: publicKey,
            amount: amount,
        });
    }

}