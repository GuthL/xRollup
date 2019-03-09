//
// usage: clevis contract get_sender_from_data Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.get_sender_from_data(args[3],args[4]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
