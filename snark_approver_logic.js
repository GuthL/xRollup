const eddsa = require("./snarks/circomlib/src/eddsa.js");
const snarkjs = require("snarkjs");
const MIMC = require('./snarks/circomlib/src/mimc7.js')
const assert = require('assert');
const fs = require('fs');

const NONCE_MAX_VALUE = 100;

function merkleTree(leafs, elements_to_proof){
 var i;
 var j;
 var h;
 const hash_leafs = leafs.map(x => MIMC.multiHash([x]));
 const hash_leafs_l = [[],[],[],[],[],[],[]];
 var tmp_elements_to_proof = elements_to_proof;
 const proofs = [[],[]];

 const tmp1 = elements_to_proof[0].toString(2).padStart(6,'0').split('').reverse();
 const tmp2 = elements_to_proof[1].toString(2).padStart(6,'0').split('').reverse();
 const paths = [tmp1.map(x => parseInt(x,10)),
     tmp2.map(x => parseInt(x,10))];

 //console.log(hash_leafs);
 hash_leafs_l[0] = hash_leafs;

 for (h = 1; h<6;h++){
  for (i = 0; i<parseInt(64/2**(h));i++){
   for (j = 0; j<2;j++){
    if (tmp_elements_to_proof[j] == 2*i){
     proofs[j].push(hash_leafs_l[h-1][2*i+1]);
    } else if (tmp_elements_to_proof[j] == 2*i+1){
     proofs[j].push(hash_leafs_l[h-1][2*i]);
    }
   }
   //console.log(h, i);
  hash_leafs_l[h].push(MIMC.multiHash([hash_leafs_l[h-1][2*i],hash_leafs_l[h-1][2*i+1]]))
  }
  tmp_elements_to_proof = tmp_elements_to_proof.map(x => Math.floor(x/2))
 }

 return [MIMC.multiHash([hash_leafs_l[5][0],hash_leafs_l[5][1]]), proofs, paths];
}

function merkleTree1(leafs, elements_to_proof){
 var i;
 var j;
 var h;
 const hash_leafs = leafs.map(x => MIMC.multiHash([x]));
 const hash_leafs_l = [[],[],[],[],[],[],[]];
 var tmp_elements_to_proof = elements_to_proof;
 const proofs = [[],[]];

 const tmp1 = elements_to_proof[0].toString(2).padStart(6,'0').split('').reverse();
 const paths = [tmp1.map(x => parseInt(x,10))];

 //console.log(hash_leafs);
 hash_leafs_l[0] = hash_leafs;

 for (h = 1; h<7;h++){
  for (i = 0; i<parseInt(64/2**(h));i++){
   for (j = 0; j<1;j++){
    if (tmp_elements_to_proof[j] == 2*i){
     proofs[j].push(hash_leafs_l[h-1][2*i+1]);
    } else if (tmp_elements_to_proof[j] == 2*i+1){
     proofs[j].push(hash_leafs_l[h-1][2*i]);
    }
   }
   //console.log(h, i);
  hash_leafs_l[h].push(MIMC.multiHash([hash_leafs_l[h-1][2*i],hash_leafs_l[h-1][2*i+1]]))
  }
  tmp_elements_to_proof = tmp_elements_to_proof.map(x => Math.floor(x/2))
 }

 return [MIMC.multiHash([hash_leafs_l[5][0],hash_leafs_l[5][1]]), proofs, paths];
}

function verifyTransfer(batchTransactions, leafsSet){	
	for (t in batchTransactions){

		const old_account_from = MIMC.multiHash([t.pubkey[0],t.token_balance_from,t.nonce,t.token_type]);
		assert(leafsSet.contains(old_account_from));

		const old_account_to = MIMC.multiHash([t.to[0],t.token_balance_to,t.nonce_to,t.token_type_to]);
		assert(leafsSet.contains(old_account_to));

		const msg = MIMC.multiHash([old_account_from, old_account_to]);

		assert(eddsa.verifyMiMC(t.pubKey, [t.R8x, t.R8y, t.S], msg));

		assert(t.token_balance_from - t.amount <= t.token_balance_from);
		assert(t.token_balance_to + t.amount >= t.token_balance_to);

		assert(t.nonce_from < NONCE_MAX_VALUE);
		assert(t.token_type_from == t.token_type_to);
	}	
}

function verifyDeposit(batchTransactions, leafsSet){	
	for (t in batchTransactions){
	}	
}

function verifyWithdraw(batchTransactions, leafsSet){	
	for (t in batchTransactions){

		const old_account_from = MIMC.multiHash([t.pubkey[0],t.token_balance_from,t.nonce,t.token_type]);
		assert(leafsSet.contains(old_account_from));

		const msg = MIMC.multiHash([old_account_from, t.withdraw]);

		assert(eddsa.verifyMiMC(t.pubKey, [t.R8x, t.R8y, t.S], msg));

		assert(t.token_balance_from - t.amount <= t.token_balance_from);

		assert(t.nonce_from < NONCE_MAX_VALUE);
		assert(t.token_type_from == t.token_type_to);
	}	
}

function generateWitnessDeposit(batchTransactions, leafsSet, current_state, current_index){
	verifyDeposit(batchTransactions, leafsSet);
	var index = current_index;
	var state = current_state;

	var pubkey = [];
	var deposit = [];
	var token_type = [];
	var paths2root = [];
	var i;

	for (i=0; i<batchTransactions.length;i++){
		let t = batchTransactions[i];
		pubkey = t.pubkey;

		deposit.push(t.deposit);
		token_type.push(t.token_type);
		let old_tree = merkleTree(leafsSet, [index,index]);
		paths2root = old_tree[1][0];
		let account = MIMC.multiHash([t.pubkey[0],t.deposit,0,t.token_type]);
		leafsSet[index] = account;
		let new_tree = merkleTree1(leafsSet, [index]);
		index = index+1;
		state = new_tree[0];
		console.log(state);
	}

	console.log(paths2root);
	const inputs = {
	current_state: current_state.toString(10),
	last_index: current_index.toString(10),
	pubkey: pubkey.map(x => x.toString(10)),
	deposit: deposit.map(x => x.toString(10)),
	token_type: (1).toString(10),
	paths2root: paths2root.map(x => x.toString(10)),
	new_state: state.toString(10),
	new_index: (current_index+batchTransactions.length).toString(10)
    }

	return inputs;
}

function generateWitnessTransfer(batchTransactions, leafsSet, current_state){
	verifyTransfer(batchTransactions, leafsSet);
	var index_proof = [];
	var state = current_state;
	for (t in batchTransactions){

		let old_account_from = MIMC.multiHash([t.pubkey[0],t.token_balance_from,t.nonce,t.token_type]);
		let old_account_to = MIMC.multiHash([t.to[0],t.token_balance_to,t.nonce_to,t.token_type_to]);

		leafsSet[leafsSet.indexOf(old_account_from)] = MIMC.multiHash([t.pubkey[0],t.token_balance_from-amount,t.nonce+1,t.token_type])
		leafsSet[leafsSet.indexOf(old_account_to)] = MIMC.multiHash([t.to[0],t.token_balance_to+amount,t.nonce_to+1,t.token_type])
		let tree = merkleTree(leafsSet, [leafsSet.indexOf(old_account_from), leafsSet.indexOf(old_account_to)]);
	}
}

function generateWitnessWithdraw(batchTransactions, leafsSet){
	verifyWithdraw(batchTransactions, leafsSet);
	var index_proof = [];
	for (t in batchTransactions){

		let old_account_from = MIMC.multiHash([t.pubkey[0],t.token_balance_from,t.nonce,t.token_type]);
		var index = leafsSet.indexOf(old_account_from)
		leafsSet[index] = MIMC.multiHash([t.pubkey[0],t.token_balance_from-amount,t.nonce+1,t.token_type])
		index_proof.push(index)
	}
	const tree = merkleTree(leafsSet, index_proof);
}

var leafs_ = [MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0]), MIMC.multiHash([0])];
const batchTransactions_ = [
			{pubkey: [1,2],
			deposit:10,
			token_type:1	
			}];

const circuitDef = JSON.parse(fs.readFileSync("/Users/guthl/xRollup/snarks/deposits/deposit.cir", "utf8"));
const circuit = new snarkjs.Circuit(circuitDef);

const input = generateWitnessDeposit(batchTransactions_, leafs_, snarkjs.bigInt("8353886343061466816144705660123631503935832617241744932012610439550875940677"),0);

fs.writeFile('input.json', JSON.stringify(input), "utf8",(err) => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})