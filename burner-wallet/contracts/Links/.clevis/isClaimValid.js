//
// usage: clevis contract isClaimValid Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isClaimValid(args[3],args[4],args[5],args[6]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
