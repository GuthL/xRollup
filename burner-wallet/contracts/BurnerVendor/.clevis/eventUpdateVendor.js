//
// usage: node contract UpdateVendor BurnerVendor
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('UpdateVendor', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
