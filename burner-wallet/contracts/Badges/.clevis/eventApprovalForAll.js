//
// usage: node contract ApprovalForAll Badges
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('ApprovalForAll', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
