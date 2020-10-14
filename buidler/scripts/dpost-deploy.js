const bre = require("@nomiclabs/buidler");
const ethers = bre.ethers;

async function main() {
	const provider = await new ethers.providers.JsonRpcProvider(
		"http://127.0.0.1:8545/"
	);

	const dPost = await ethers.getContractFactory("dPost");
	const dpost = await dPost.deploy();

	await dpost.deployed();

	console.log("dPost deployed to ", dpost.address);

	// initialize with a post from the deployer

	let tx = await dpost.addPost(
		"What's everyone's favorite NFT farming shitcoin?"
	);
	console.log(tx, "above is the inital post data");

	let post = await dpost.getPostById(0);
	console.log(post, "above is the initial post data");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

// npx buidler run scripts/dpost-deploy.js --network localhost --show-stack-traces --verbose
