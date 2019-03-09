//
// usage: clevis contract getStringParam Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.getStringParam(args[3],args[4]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
