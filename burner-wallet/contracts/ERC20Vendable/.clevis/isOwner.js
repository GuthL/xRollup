//
// usage: clevis contract isOwner ERC20Vendable
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isOwner().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
