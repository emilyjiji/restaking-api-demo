import { expect } from "chai";
import sinon from "sinon";
import { stake } from "../stake.js";
import { ethers } from "ethers";

describe("stake function", () => {
    let providerMock;

    beforeEach(() => {
        // Create a mock provider
        providerMock = {
            getBalance: sinon.stub(),
        };
    });

    afterEach(() => {
        // Restore everything
        sinon.restore();
    });

    it("should call stake() when wallet balance is >= 32 ETH", async () => {
        providerMock.getBalance.resolves(ethers.parseEther("32"));

        await stake(providerMock);

        expect(providerMock.getBalance.calledOnce).to.be.true;
    });

    it("should not call stake() when wallet balance is < 32 ETH", async () => {
        providerMock.getBalance.resolves(ethers.parseEther("31"));
        await stake(providerMock);

        expect(providerMock.getBalance.calledOnce).to.be.true;
    });
});
