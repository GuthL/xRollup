//
// usage: node contract WhitelistedAdded VendingMachine
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('WhitelistedAdded', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
