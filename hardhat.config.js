require("@nomiclabs/hardhat-waffle");
require("hardhat-abi-exporter");

module.exports = {
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  },
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
    }
    // goerli: {
    //   url: `https://goerli.infura.io/v3/${API_KEY}`,
    //   accounts: [PRIVATE_KEY],
    // }
  },
  solidity: "0.8.19",
};
