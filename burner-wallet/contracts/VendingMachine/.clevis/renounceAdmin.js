//
// usage: clevis contract renounceAdmin VendingMachine ##accountindex## 
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running renounceAdmin() as account ["+params.accounts[args[3]]+"]")
  return contract.methods.renounceAdmin().send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
