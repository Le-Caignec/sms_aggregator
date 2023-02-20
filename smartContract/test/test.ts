import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test SMS_Aggregator", function () {

  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const SMS_Aggregator = await ethers.getContractFactory("SMS_Aggregator");
    const sms_aggreagator = await SMS_Aggregator.deploy();
    return { sms_aggreagator, owner, otherAccount };
  }

  describe("function", function () {
    it("Add & Get Function Should set the right value", async function () {
      const { sms_aggreagator } = await loadFixture(deployFixture);
      await sms_aggreagator.addScret("0.1", 1676739703, "La Descripion de mon secret 1");
      await sms_aggreagator.addScret("0.2", 1676739703, "La Descripion de mon secret 1");

      const signer2 = await ethers.getSigner(
        '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      )

      await sms_aggreagator.connect(signer2).addScret("1.1", 1676739703, "La Descripion de mon secret 1");
      await sms_aggreagator.connect(signer2).addScret("1.2", 1676739703, "La Descripion de mon secret 1");

      expect(await sms_aggreagator.getMyScret()).to.deep.equal([["0.1", 1676739703, "La Descripion de mon secret 1"], ["0.2", 1676739703, "La Descripion de mon secret 1"]]);
      expect(await sms_aggreagator.connect(signer2).getMyScret()).to.deep.equal([["1.1", 1676739703, "La Descripion de mon secret 1"], ["1.2", 1676739703, "La Descripion de mon secret 1"]]);
    });

  });

  describe("Events", function () {
    it("Should catch event when a new person is added", async function () {
      const { sms_aggreagator, owner, otherAccount } = await loadFixture(deployFixture);
      const signer2 = await ethers.getSigner(otherAccount.address)

      await expect(sms_aggreagator.addScret("1", 1676739703, "La Descripion de mon secret"))
        .to.emit(sms_aggreagator, "newPerson")
        .withArgs(owner.address);
      await expect(sms_aggreagator.connect(signer2).addScret("1", 1676739703, "La Descripion de mon secret"))
        .to.emit(sms_aggreagator, "newPerson")
        .withArgs(otherAccount.address);

    });
    it("Should catch event when a new secret is added", async function () {
      const { sms_aggreagator, owner } = await loadFixture(deployFixture);

      await expect(sms_aggreagator.addScret("1", 1676739703, "La Descripion de mon secret"))
        .to.emit(sms_aggreagator, "ScretAdded")
        .withArgs(owner.address, "1", 1676739703, "La Descripion de mon secret");
    });

  });

});
