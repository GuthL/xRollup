var mnemonic = require('./config').mnemonic;
var infuraAccessToken = require('./config').infuraAccessToken;
var HDWalletProvider = require("truffle-hdwallet-provider");

console.log(mnemonic, infuraAccessToken);

module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${infuraAccessToken}`)
      },
      network_id: 4,
    }
  }
};
