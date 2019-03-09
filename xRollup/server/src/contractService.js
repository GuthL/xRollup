module.exports = class ContractService {
    constructor(web3, web3Wallet) {
        this.web3 = web3;
        this.web3Wallet = web3Wallet;

        this.ethAccount = this.web3.eth.accounts[0];
        console.log(this.ethAccount);

        const abi = require('../build/contracts/Main.json').abi;
        const address = "0x89145Fac5fe2Fcc36814fC50273F5c3Af5Bba531";
        console.log("address", address);
        this.mainContract = new this.web3.eth.Contract(abi, address);
        //TODO: set main service
    }

    getWeb3() {
        return this.web3;
    }

    getWeb3Wallet() {
        return this.web3Wallet;
    }


    getMainContract() {
        return this.mainContract;
    }

    getState() {
        this.mainContract.methods.getState().call((error, result) => {
            return result;
        });
    }

    setState(newState) {
        this.mainContract.methods.setState(newState).send()
            .then((receipt) => {
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
            });
    }

    withdrawToken(token, to, amount, proof, newState) {
        this.mainContract.methods.withdrawToken(token, to, amount, proof, newState).send()
        .then((receipt) => {
            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
    }
}