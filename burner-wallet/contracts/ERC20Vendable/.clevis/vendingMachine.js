//
// usage: clevis contract vendingMachine ERC20Vendable
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.vendingMachine().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
