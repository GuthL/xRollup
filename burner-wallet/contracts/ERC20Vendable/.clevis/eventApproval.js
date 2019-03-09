//
// usage: node contract Approval ERC20Vendable
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Approval', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
