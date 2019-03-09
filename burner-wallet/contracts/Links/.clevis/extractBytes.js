//
// usage: clevis contract extractBytes Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.extractBytes(args[3],args[4],args[5]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
