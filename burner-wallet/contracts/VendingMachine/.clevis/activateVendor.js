//
// usage: clevis contract activateVendor VendingMachine ##accountindex## _isActive
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running activateVendor("+args[4]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.activateVendor((args[4]==="true")).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
