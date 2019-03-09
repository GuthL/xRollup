//
// usage: clevis contract isClaimExpired Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isClaimExpired(args[3],args[4],args[5],args[6]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
