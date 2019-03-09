//
// usage: clevis contract post_relayed_call Links ##accountindex## 
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running post_relayed_call("+args[4]+","+args[5]+","+args[6]+","+args[7]+","+args[8]+","+args[9]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.post_relayed_call(args[4],args[5],args[6],(args[7]==="true"),args[8],args[9]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
