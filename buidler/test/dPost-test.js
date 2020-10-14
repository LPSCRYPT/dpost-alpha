const { expect } = require("chai");

describe("dPost", function () {
	it("Should create a post and log the amount of seconds to wait before another action is permitted.", async function () {
		const dPost = await ethers.getContractFactory("dPost");
		const dpost = await dPost.deploy();

		await dpost.deployed();

		await dpost.addPost("Ladies and gentlemen, welcome to the d'Org Clubhouse");

		expect((await dpost.getPostById(0))[4]).to.equal(
			"Ladies and gentlemen, welcome to the d'Org Clubhouse"
		);

		let creator = await dpost.creator();
		let timestamps = await dpost.checkTime(creator);

		expect((await dpost.checkTime(creator))[1]).to.not.equal(0);

		console.log(
			"You have " +
				(timestamps[1] - timestamps[0]) +
				" seconds left before you can take another action"
		);
	});
});
