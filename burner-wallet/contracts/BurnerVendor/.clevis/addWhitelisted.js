//
// usage: clevis contract addWhitelisted BurnerVendor ##accountindex## account
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running addWhitelisted("+args[4]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.addWhitelisted(args[4]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
