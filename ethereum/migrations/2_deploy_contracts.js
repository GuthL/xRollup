const Main = artifacts.require("Main");

module.exports = function (deployer) {
  deployer.deploy(Main);

  // await mainInstance.setDepositVerifier(depositVerfier.address)
  // await mainInstance.setTransferVerifier(transferVerfier.address)
  // await mainInstance.setWithdrawVerifier(withdrawVerfier.address)

  // deployer.deploy(Main)
  //   .then(function () {
  //     return PetCore.deployed()
  //       .then(function (deployed) {
  //         mainInstance = deployed;
  //         return deployer
  //           .deploy(DepositVerifier).then(function () {
  //             return deployer
  //               .deploy(TransferVerifier).then(function () {
  //                 return deployer
  //                   .deploy(WithdrawVerifier).then(function () {
  //                     //do something else
  //                   }).then(function () {
  //                     //do something else
  //                   })
  //               })
  //           })
  //       })
  //   })
}