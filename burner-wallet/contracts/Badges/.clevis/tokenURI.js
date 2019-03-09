//
// usage: clevis contract tokenURI Badges
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.tokenURI(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
