//
// usage: node contract Withdraw VendingMachine
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Withdraw', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
