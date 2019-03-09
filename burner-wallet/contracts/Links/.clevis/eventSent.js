//
// usage: node contract Sent Links
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Sent', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
