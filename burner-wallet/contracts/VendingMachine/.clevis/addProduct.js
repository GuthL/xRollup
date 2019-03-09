//
// usage: clevis contract addProduct VendingMachine ##accountindex## id name cost isAvailable
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running addProduct("+args[4]+","+args[5]+","+args[6]+","+args[7]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.addProduct(args[4],args[5],args[6],(args[7]==="true")).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
