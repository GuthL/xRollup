module.exports = class ContractService {
    constructor(web3, web3Wallet, stateManager) {
        this.web3 = web3;
        this.web3Wallet = web3Wallet;
        this.stateManager = stateManager;

        this.ethAccount = this.web3.eth.accounts[0];
        console.log(this.ethAccount);

        // const abi = "";
        // const address = "";
        // this.mainContract = new this.web3.eth.Contract(abi, address);
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
        this.mainContract.methods.setState(newState).send({ from: this.ethAccount })
            .then((receipt) => {
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
            });
    }

    withdraw(to, amount, proof, newState) {
        this.mainContract.methods.withdraw(to, amount, proof, newState).send({ from: this.ethAccount })
        .then((receipt) => {
            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
    }
}