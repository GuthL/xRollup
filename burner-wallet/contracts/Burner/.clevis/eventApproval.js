//
// usage: node contract Approval Burner
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Approval', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
