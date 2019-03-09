//
// usage: clevis contract isWhitelisted BurnerVendor
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isWhitelisted(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
