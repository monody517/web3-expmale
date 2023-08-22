const hre = require("hardhat");

async function main() {
    // 获取合约文件
  const MonToken = await hre.ethers.getContractFactory("MonToken");
    // 获取合约部署的对象
  const monToken = await MonToken.deploy("WTF","WTF",18,1024);
    console.log(monToken)
  await monToken.deployed();
    // 打印一下部署的结果
  console.log("MonToken deployed to:", monToken.address);
  saveFrontendFiles(monToken);
}

function saveFrontendFiles(counter) {
  const fs = require("fs");
  const contractsDir = "./data";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({
      Counter: counter.address
    }, undefined, 2)
  );

  const MonTokenArtifact = artifacts.readArtifactSync("MonToken");

  fs.writeFileSync(
    contractsDir + "/MonToken.json",
    JSON.stringify(MonTokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });