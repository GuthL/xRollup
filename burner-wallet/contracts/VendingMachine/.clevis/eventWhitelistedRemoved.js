//
// usage: node contract WhitelistedRemoved VendingMachine
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('WhitelistedRemoved', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
