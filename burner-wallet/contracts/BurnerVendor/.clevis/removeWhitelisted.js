//
// usage: clevis contract removeWhitelisted BurnerVendor ##accountindex## account
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running removeWhitelisted("+args[4]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.removeWhitelisted(args[4]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
