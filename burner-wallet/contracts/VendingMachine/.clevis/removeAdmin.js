//
// usage: clevis contract removeAdmin VendingMachine ##accountindex## account
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running removeAdmin("+args[4]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.removeAdmin(args[4]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
