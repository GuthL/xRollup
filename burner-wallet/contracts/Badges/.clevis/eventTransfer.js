//
// usage: node contract Transfer Badges
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Transfer', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
