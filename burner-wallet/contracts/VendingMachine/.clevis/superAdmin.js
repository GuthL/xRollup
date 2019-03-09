//
// usage: clevis contract superAdmin VendingMachine
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.superAdmin().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
