//
// usage: node contract UpdateVendor VendingMachine
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('UpdateVendor', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
