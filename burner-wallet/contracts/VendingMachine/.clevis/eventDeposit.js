//
// usage: node contract Deposit VendingMachine
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Deposit', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
