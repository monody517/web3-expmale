const hre = require("hardhat");
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const MonTokenAddress = "0xc496Fa8d5163CC9d757Aa5F1bdaAd66D98D1cb44"
  readline.question(`Which token you want to deploy?`, async (name) => {
    let tokenName, constructorParams;
    switch (name) {
      case 'MonToken':
        tokenName = 'MonToken';
        constructorParams = ["WTF", "WTF", 18, 1024]
      case 'Faucet':
        tokenName = 'Faucet';
        constructorParams = [MonTokenAddress, 10]
    }
      // 获取合约文件
    const Token = await hre.ethers.getContractFactory(tokenName);
      // 获取合约部署的对象
    const token = await Token.deploy(...constructorParams);
    await token.deployed();
      // 打印一下部署的结果
    console.log("Token deployed to:", token.address);
    saveFrontendFiles(token);

    function saveFrontendFiles(counter) {
      const fs = require("fs");
      const contractsDir = "./data";

      if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
      }

      fs.writeFileSync(
        contractsDir + `/${name}-contract-address.json`,
        JSON.stringify({
          Counter: counter.address
        }, undefined, 2)
      );
      
      const artifact = artifacts.readArtifactSync(name);

      fs.writeFileSync(
        contractsDir + `/${name}.json`,
        JSON.stringify(artifact, null, 2)
      );
    }
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });