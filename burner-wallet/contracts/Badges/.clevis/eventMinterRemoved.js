//
// usage: node contract MinterRemoved Badges
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('MinterRemoved', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
