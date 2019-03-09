//
// usage: node contract AddProduct BurnerVendor
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('AddProduct', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
