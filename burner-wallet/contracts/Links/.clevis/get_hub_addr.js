//
// usage: clevis contract get_hub_addr Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.get_hub_addr().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
