//
// usage: clevis contract get_sender Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.get_sender().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
