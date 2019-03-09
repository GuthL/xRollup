//
// usage: clevis contract isAdmin BurnerVendor
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isAdmin(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
