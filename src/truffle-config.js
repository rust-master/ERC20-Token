const HDWalletProvider = require("@truffle/hdwallet-provider");

const secrets = require("../src/secerts.json");
const mnemonic = secrets.nm;

module.exports = {
  networks: {
    testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`
        ),
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.6",
    },
  },
};
