//
// usage: clevis contract deposit_to_relay_hub Links ##accountindex## 
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running deposit_to_relay_hub() as account ["+params.accounts[args[3]]+"] sending value ("+args[4]+")")
  return contract.methods.deposit_to_relay_hub().send({
    from: params.accounts[args[3]],
    value: args[4],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
