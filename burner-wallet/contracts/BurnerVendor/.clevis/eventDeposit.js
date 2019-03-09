//
// usage: node contract Deposit BurnerVendor
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('Deposit', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
