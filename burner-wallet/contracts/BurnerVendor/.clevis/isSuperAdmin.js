//
// usage: clevis contract isSuperAdmin BurnerVendor
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isSuperAdmin(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
