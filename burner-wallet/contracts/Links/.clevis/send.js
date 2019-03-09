//
// usage: clevis contract send Links ##accountindex## _id _signature _token _amount _expirationDays
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running send("+args[5]+","+args[6]+","+args[7]+","+args[8]+","+args[9]+") as account ["+params.accounts[args[3]]+"] sending value ("+args[4]+")")
  return contract.methods.send(args[5],args[6],args[7],args[8],args[9]).send({
    from: params.accounts[args[3]],
    value: args[4],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
