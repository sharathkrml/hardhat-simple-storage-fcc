const { ethers } = require("hardhat");
const { assert, expect } = require("chai");
describe("SimpleStorage", () => {
  let simpleStorage;
  beforeEach(async () => {
    const Factory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await Factory.deploy();
  });
  it("Should start  with a favorite number 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), "0");
  });
  it("Should update when we call store", async () => {
    const expectedValue = 7;
    const txnResponse = await simpleStorage.store(expectedValue);
    await txnResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue.toString(), expectedValue);
  });
  it("Add Person to array people", async () => {
    let [expectedName, expectedNum] = ["Sharath", 10];
    let txnResponse = await simpleStorage.addPerson(expectedName, expectedNum);
    await txnResponse.wait(1);

    let result = await simpleStorage.people(0);
    assert.equal(result.name, expectedName);
    assert.equal(result.favoriteNumber.toString(), expectedNum);
  });
});
