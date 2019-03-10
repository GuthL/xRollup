const approver = require("./snark_approver_logic");
const fs = require('fs');
const zkSnark = require("snarkjs");

var leafs_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const batchTransactions_ = [
			{pubkey:1,
			deposit:10,
			token_type:1	
			},
			{pubkey:2,
			deposit:100,
			token_type:1	
			}];

const circuitDef = JSON.parse(fs.readFileSync("/Users/guthl/xRollup/snarks/deposits/deposit.cir", "utf8"));
const circuit = new zkSnark.Circuit(circuitDef);

const input = approver.generateWitnessDeposit(batchTransactions_, leafs_, 8353886343061466816144705660123631503935832617241744932012610439550875940677,0);

fs.writeFile('input.json', input, 'utf8');
