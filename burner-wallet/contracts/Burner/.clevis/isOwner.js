//
// usage: clevis contract isOwner Burner
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isOwner().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
