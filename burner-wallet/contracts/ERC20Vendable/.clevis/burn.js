//
// usage: clevis contract burn ERC20Vendable ##accountindex## from value
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running burn("+args[4]+","+args[5]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.burn(args[4],args[5]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
