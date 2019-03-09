//
// usage: node contract MinterAdded Badges
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('MinterAdded', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
