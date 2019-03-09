//
// usage: clevis contract decreaseAllowance Burner ##accountindex## spender subtractedValue
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running decreaseAllowance("+args[4]+","+args[5]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.decreaseAllowance(args[4],args[5]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
