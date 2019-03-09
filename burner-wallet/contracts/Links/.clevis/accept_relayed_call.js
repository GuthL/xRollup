//
// usage: clevis contract accept_relayed_call Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.accept_relayed_call(args[3],args[4],args[5],args[6],args[7]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
