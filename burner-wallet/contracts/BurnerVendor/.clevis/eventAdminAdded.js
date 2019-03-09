//
// usage: node contract AdminAdded BurnerVendor
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('AdminAdded', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
