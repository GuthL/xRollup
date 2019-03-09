//
// usage: clevis contract getMethodSig Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.getMethodSig(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
