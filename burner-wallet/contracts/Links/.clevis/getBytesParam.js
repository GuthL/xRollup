//
// usage: clevis contract getBytesParam Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.getBytesParam(args[3],args[4]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
