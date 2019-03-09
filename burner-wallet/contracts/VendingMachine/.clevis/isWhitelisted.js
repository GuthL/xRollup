//
// usage: clevis contract isWhitelisted VendingMachine
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isWhitelisted(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
