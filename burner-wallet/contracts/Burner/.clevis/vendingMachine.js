//
// usage: clevis contract vendingMachine Burner
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.vendingMachine().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
