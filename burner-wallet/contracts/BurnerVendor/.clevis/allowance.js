//
// usage: clevis contract allowance BurnerVendor
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.allowance(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
