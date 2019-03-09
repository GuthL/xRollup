//
// usage: clevis contract getParam Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.getParam(args[3],args[4]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
