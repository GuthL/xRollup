//
// usage: node contract WhitelistedAdded BurnerVendor
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('WhitelistedAdded', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
