//
// usage: clevis contract tokenContract VendingMachine
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.tokenContract().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
