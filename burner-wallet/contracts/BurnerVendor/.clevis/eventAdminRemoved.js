//
// usage: node contract AdminRemoved BurnerVendor
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('AdminRemoved', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
