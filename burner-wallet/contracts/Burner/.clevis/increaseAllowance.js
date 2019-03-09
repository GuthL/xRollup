//
// usage: clevis contract increaseAllowance Burner ##accountindex## spender addedValue
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running increaseAllowance("+args[4]+","+args[5]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.increaseAllowance(args[4],args[5]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
