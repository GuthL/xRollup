//
// usage: clevis contract balanceOf Badges
//
module.exports = async (contract,params,args)=>{
  return await contract.methods.balanceOf(args[3]).call()
  /*.then((##outputs##)=>{
    console.log(##results##)
  })*/
}
