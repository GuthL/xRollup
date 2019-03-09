//
// usage: clevis contract mintNextTokenWithTokenURI Badges ##accountindex## to tokenURI
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running mintNextTokenWithTokenURI("+args[4]+","+args[5]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.mintNextTokenWithTokenURI(args[4],args[5]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
