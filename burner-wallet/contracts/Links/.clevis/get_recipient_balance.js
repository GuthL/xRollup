//
// usage: clevis contract get_recipient_balance Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.get_recipient_balance().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
