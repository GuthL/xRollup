//
// usage: node contract TransferWithData Burner
//
module.exports = (contract,params,args)=>{
  return contract.getPastEvents('TransferWithData', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  })
}
