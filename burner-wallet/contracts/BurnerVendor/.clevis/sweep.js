//
// usage: clevis contract sweep BurnerVendor ##accountindex## amount
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running sweep("+args[4]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.sweep(args[4]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
