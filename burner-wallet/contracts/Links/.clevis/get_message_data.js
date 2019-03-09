//
// usage: clevis contract get_message_data Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.get_message_data().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
