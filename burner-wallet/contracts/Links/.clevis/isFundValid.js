//
// usage: clevis contract isFundValid Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.isFundValid(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
