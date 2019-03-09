//
// usage: clevis contract products VendingMachine
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.products(args[3],args[4]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
