//
// usage: clevis contract updateVendor VendingMachine ##accountindex## _vendorAddress _name _isActive _isAllowed
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running updateVendor("+args[4]+","+args[5]+","+args[6]+","+args[7]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.updateVendor(args[4],args[5],(args[6]==="true"),(args[7]==="true")).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
