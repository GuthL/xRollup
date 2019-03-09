//
// usage: clevis contract renounceOwnership ERC20Vendable ##accountindex## 
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running renounceOwnership() as account ["+params.accounts[args[3]]+"]")
  return contract.methods.renounceOwnership().send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
