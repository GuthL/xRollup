//
// usage: node contract AdminAdded VendingMachine
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('AdminAdded', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
