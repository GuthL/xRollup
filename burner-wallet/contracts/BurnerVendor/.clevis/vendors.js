//
// usage: clevis contract vendors BurnerVendor
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.vendors(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
