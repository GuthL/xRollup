//
// usage: node contract TransferWithData ERC20Vendable
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('TransferWithData', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
