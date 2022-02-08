// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const SquareVerifier = artifacts.require('SquareVerifier');


contract('SolnSquareVerifier', accounts => {
    const owner = accounts[0];

    describe('SolnSquareVerifier', async () => {
        let contract;
        before(async () => {
            contract = await SolnSquareVerifier.new("EthLand", "ETL")
        });
       
        it('should set square verifier contract', async () => {
            const squareVerifier = await SquareVerifier.new();
            const r = await contract.setSquareVerifierContract(squareVerifier.address);
            assert.equal(!!r.tx, true, "SquareVerifierContractSet event not emitted");
        });

        it('should mint with proof', async () => {
            const proof = require('./proof.json');
            const r = await contract.mint(proof.proof, proof.inputs, accounts[1], 1);

            assert.equal(r.logs[0].event, 'Transfer', "Transfer event not emitted");
            assert.equal(r.logs[0].args.from, owner, 'Transfer event from not correct');
            assert.equal(r.logs[0].args.to, accounts[1], 'Transfer event to not correct');

            const tokenOwner = await contract.ownerOf.call(1);
            assert.equal(tokenOwner, accounts[1], 'Token owner not correct');
        })

        it('should not mint with wrong proof', async () => {
            const proof = require('./proof.json');
            const r = await contract.mint(proof.proof, [2, 1], accounts[1], 1);

            assert.equal(r.receipt.message, "revert", "Should be reverted if wrong proof");
        })

        it('should not with same proofs', async () => {
            const proof = require('./proof.json');

            await contract.mint(proof.proof, proof.inputs, accounts[1], 1);
            const r = await contract.mint(proof.proof, proof.inputs, accounts[1], 2);

            assert.equal(r.receipt.message, "revert", "Should be reverted if proof is reused");
        })
    });
});