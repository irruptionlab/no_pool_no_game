async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Contract = await ethers.getContractFactory("NpngPool");
    const contract = await Contract.deploy();

    console.log("Contract address:", contract.address);

    // const Pool = await ethers.getContractFactory("Npng");
    // const pool = await Pool.deploy();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });