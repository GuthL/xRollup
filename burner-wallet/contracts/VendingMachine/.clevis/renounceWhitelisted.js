//
// usage: clevis contract renounceWhitelisted VendingMachine ##accountindex## 
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running renounceWhitelisted() as account ["+params.accounts[args[3]]+"]")
  return contract.methods.renounceWhitelisted().send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
