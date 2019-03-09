//
// usage: clevis contract balance Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.balance(args[3],args[4]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
