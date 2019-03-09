const eddsa = require("./src/eddsa.js");
const snarkjs = require("./src/snarkjs");
const MerkleTree = require('merkletreejs')
const MIMC = require('./src/mimc7.js')


const NONCE_MAX_VALUE = 100;

function castBigInt(){

}

function MerkleTree(leafs){
	for 
}

function verifyTransfer(batchTransactions, leafsSet){	
	for (t in batchTransactions){

		const old_account_from = MIMC.multiHash([t.pubkey[0],t.token_balance_from,t.nonce,t.token_type]);
		assert(leafsSet.contains(old_account_from));

		const old_account_to = MIMC.multiHash([t.to[0],t.token_balance_to,t.nonce_to,t.token_type_to]);
		assert(leafsSet.contains(old_account_to));

		const msg = MIMC.multiHash([old_account_from, old_account_to]);

		assert(eddsa.verifyMiMC(t.pubKey, [t.R8x, t.R8y, t.S], msg));

		assert(t.token_balance_from - t.amount <= t.token_balance_from;
		assert(t.token_balance_to + t.amount >= t.token_balance_to);

		assert(t.nonce_from < NONCE_MAX_VALUE);
		assert(t.token_type_from == t.token_type_to);

		const tree = new MerkleTree(leaves, MIMC.multiHash)



	}	
}

function verifyDeposit(batchTransactions){	
	for (t in batchTransactions){
		assert(eddsa.verifyMiMC(pubKey, msg));

		const leaves = ['a', 'b', 'c'].map(x => MIMC(x))
		const tree = new MerkleTree(leaves, MIMC)
		const root = tree.getRoot().toString('hex')
		const leaf = MIMC('a')
		const proof = tree.getProof(leaf)

	}	
}

function verifyWithdraw(batchTransactions){	
	for (t in batchTransactions){
		assert(eddsa.verifyMiMC(pubKey, msg));

		const leaves = ['a', 'b', 'c'].map(x => MIMC(x))
		const tree = new MerkleTree(leaves, MIMC)
		const root = tree.getRoot().toString('hex')
		const leaf = MIMC('a')
		const proof = tree.getProof(leaf)

	}	
}

function generateWitnessTransfer(batchTransactions){
	verifyTransfer(batchTransactions);

}