//
// usage: node contract VaultTransfer Links
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('VaultTransfer', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
