//
// usage: clevis contract addVendor VendingMachine ##accountindex## _vendorAddress _name
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running addVendor("+args[4]+","+args[5]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.addVendor(args[4],args[5]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
