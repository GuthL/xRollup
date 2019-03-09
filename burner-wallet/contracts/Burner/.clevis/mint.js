//
// usage: clevis contract mint Burner ##accountindex## to amount
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running mint("+args[4]+","+args[5]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.mint(args[4],args[5]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
