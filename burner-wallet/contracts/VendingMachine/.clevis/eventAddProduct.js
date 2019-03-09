//
// usage: node contract AddProduct VendingMachine
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('AddProduct', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
