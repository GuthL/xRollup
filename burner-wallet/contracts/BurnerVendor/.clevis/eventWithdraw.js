//
// usage: node contract Withdraw BurnerVendor
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Withdraw', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
