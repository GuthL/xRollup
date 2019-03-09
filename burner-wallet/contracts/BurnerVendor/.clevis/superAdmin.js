//
// usage: clevis contract superAdmin BurnerVendor
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.superAdmin().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
