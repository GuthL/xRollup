//
// usage: clevis contract funds Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.funds(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
