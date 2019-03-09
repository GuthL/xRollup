//
// usage: clevis contract isSuperAdmin VendingMachine
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isSuperAdmin(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
