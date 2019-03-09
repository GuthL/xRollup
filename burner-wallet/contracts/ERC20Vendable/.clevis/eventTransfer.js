//
// usage: node contract Transfer ERC20Vendable
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Transfer', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
