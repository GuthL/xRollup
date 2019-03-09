//
// usage: node contract WhitelistedRemoved BurnerVendor
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('WhitelistedRemoved', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
