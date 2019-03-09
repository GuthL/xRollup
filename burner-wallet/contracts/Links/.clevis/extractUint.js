//
// usage: clevis contract extractUint Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.extractUint(args[3],args[4]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
