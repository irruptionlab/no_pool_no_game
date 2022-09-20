async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Token = await ethers.getContractFactory("DAI");
    const token = await Token.deploy();

    console.log("Token address:", token.address);

    // const Pool = await ethers.getContractFactory("Npng");
    // const pool = await Pool.deploy();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });