//
// usage: node contract AdminRemoved VendingMachine
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('AdminRemoved', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
