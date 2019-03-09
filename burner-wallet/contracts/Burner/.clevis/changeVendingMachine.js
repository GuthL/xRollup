//
// usage: clevis contract changeVendingMachine Burner ##accountindex## newVendingMachine
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running changeVendingMachine("+args[4]+") as account ["+params.accounts[args[3]]+"]")
  return contract.methods.changeVendingMachine(args[4]).send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
