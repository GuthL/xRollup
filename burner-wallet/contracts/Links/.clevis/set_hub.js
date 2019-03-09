//
// usage: clevis contract set_hub Links ##accountindex## rhub
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running set_hub("+args[4]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.set_hub(args[4]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
