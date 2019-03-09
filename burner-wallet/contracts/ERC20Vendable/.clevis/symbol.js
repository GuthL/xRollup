//
// usage: clevis contract symbol ERC20Vendable
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.symbol().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
