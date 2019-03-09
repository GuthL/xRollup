//
// usage: clevis contract contractNonce Links
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.contractNonce().call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
