//
// usage: clevis contract tokenByIndex Badges
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.tokenByIndex(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
