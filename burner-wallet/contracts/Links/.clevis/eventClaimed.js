//
// usage: node contract Claimed Links
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Claimed', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
