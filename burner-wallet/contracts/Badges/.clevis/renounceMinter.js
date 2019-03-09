//
// usage: clevis contract renounceMinter Badges ##accountindex## 
//

module.exports = (contract,params,args)=>{
  const DEBUG = false
  if(DEBUG) console.log("**== Running renounceMinter() as account ["+params.accounts[args[3]]+"]")
  return contract.methods.renounceMinter().send({
    from: params.accounts[args[3]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
