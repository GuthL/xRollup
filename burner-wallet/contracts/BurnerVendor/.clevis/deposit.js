//
// usage: clevis contract deposit BurnerVendor ##accountindex## 
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running deposit() as account ["+params.accounts[args[3]]+"] sending value ("+args[4]+")")
  return contract.methods.deposit().send({
    from: params.accounts[args[3]],
    value: args[4],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
