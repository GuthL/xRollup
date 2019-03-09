//
// usage: clevis contract tokenContract BurnerVendor
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.tokenContract().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
