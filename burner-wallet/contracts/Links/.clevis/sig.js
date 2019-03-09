//
// usage: clevis contract sig Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.sig(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
