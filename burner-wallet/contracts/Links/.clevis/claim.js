//
// usage: clevis contract claim Links ##accountindex## _id _signature _claimHash _destination
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running claim("+args[4]+","+args[5]+","+args[6]+","+args[7]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.claim(args[4],args[5],args[6],args[7]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
