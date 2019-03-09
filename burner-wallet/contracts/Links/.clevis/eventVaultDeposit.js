//
// usage: node contract VaultDeposit Links
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('VaultDeposit', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
