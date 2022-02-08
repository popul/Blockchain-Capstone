const Ownable = artifacts.require('Ownable');
const Pausable = artifacts.require('Pausable');
const ERC721Mintable = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const owner = accounts[0];

    describe('Ownable', async () => {
        let ownableContract;
        before(async () => {
            ownableContract = await ERC721Mintable.deployed();
        })
        it('only owner can call transferOwnership', async () => {
            const r = await ownableContract.transferOwnership(accounts[2], { from: accounts[1] });
            assert.equal(r.receipt.message, 'revert', "Only owner can call transferOwnership");

            await ownableContract.transferOwnership(accounts[1], { from: owner });
            await ownableContract.transferOwnership(owner, { from: accounts[1] });
        });
        it('should send OwnerChanged event when onwer changed', async() => {
            const r = await ownableContract.transferOwnership(accounts[1], { from: owner });
            await ownableContract.transferOwnership(owner, { from: accounts[1] });

            assert.equal(r.logs[0].event, 'OwnerChanged', "OwnerChanged event not emitted");
            assert.equal(r.logs[0].args.newOwner, accounts[1], "new owner not correct");
        });
    });

    describe('Pausable', async () => {
        let pausableContract;
        before(async () => {
            pausableContract = await ERC721Mintable.deployed();
        });
        it('only owner can call setPaused', async () => {
            const r = await pausableContract.setPaused(true, { from: accounts[1] });
            assert.equal(r.receipt.message, 'revert', "Only owner can call setPaused");

            await pausableContract.setPaused(true, { from: owner });
            await pausableContract.setPaused(false, { from: owner });
        });
        it('should send Paused and Unpaused events', async() => {
            const rPaused = await pausableContract.setPaused(true, { from: owner });
            assert.equal(rPaused.logs[0].event, 'Paused', "Paused event not emitted");
            assert.equal(rPaused.logs[0].args.addr, owner, "Paused event not emitted");

            const rUnpaused = await pausableContract.setPaused(false, { from: owner });
            assert.equal(rUnpaused.logs[0].event, 'Unpaused', "Unpaused event not emitted");
            assert.equal(rUnpaused.logs[0].args.addr, owner, "Paused event not emitted");
        })
    });

    describe('ERC721Mintable', function () {
        let erc721MintableContract;
        before(async function () { 
            erc721MintableContract = await ERC721Mintable.new("EthLand", "ETL");
        })

        it('should mint token', async () => {
            const r = await erc721MintableContract.mint(accounts[1], 1, { from: owner });

            assert.equal(r.logs[0].event, 'Transfer', "Transfer event not emitted");
            assert.equal(r.logs[0].args.from, owner, 'Transfer event from not correct');
            assert.equal(r.logs[0].args.to, accounts[1], 'Transfer event to not correct');

            const tokenOwner = await erc721MintableContract.ownerOf.call(1);
            assert.equal(tokenOwner, accounts[1], 'Token owner not correct');
        });

        it('should fail when minting when address is not contract owner', async function () { 
            const r = await erc721MintableContract.mint(accounts[2], 2, { from: accounts[1] }); 
            assert.equal(r.receipt.message, 'revert', "Mint should fail when address is not contract owner");
        });
    });

    describe('ERC721', function () {
        let erc721Contract;
        before(async function () { 
            erc721Contract = await ERC721Mintable.new("EthLand", "ETL");
        })

        it('should add approval as owner', async function() {
            const tokenId = 1;
            await erc721Contract.mint(accounts[1], tokenId, { from: owner });
            const r = await erc721Contract.approve(accounts[2], tokenId, { from: accounts[1] });
            assert.equal(r.logs[0].event, 'Approval', "Approval event not emitted");
            assert.equal(r.logs[0].args.owner, accounts[1], "Approval event owner not correct");
            assert.equal(r.logs[0].args.approved, accounts[2], "Approval event approved not correct");
            assert.equal(r.logs[0].args.tokenId, 1, "Approval event tokenId not correct");

            const approver = await erc721Contract.getApproved.call(tokenId);
            assert.equal(approver, accounts[2], "Approver not correct");
        });

        it('should add approval as operator', async function() {
            const tokenId = 2;
            await erc721Contract.mint(accounts[1], tokenId, { from: owner });

            await erc721Contract.setApprovalForAll(accounts[2], true, { from: accounts[1] });
            const isOperator = await erc721Contract.isApprovedForAll.call(accounts[1], accounts[2]);
            assert.equal(isOperator, true, "operator not set correctly");
        });

        it('should get token balance', async function () { 
            for (let i = 3; i < 10; i++) {
                await erc721Contract.mint(accounts[2], i, { from: owner });
            }
            const balance = await erc721Contract.balanceOf.call(accounts[2]);
            assert.equal(balance.toNumber(), 7, "Balance not correct");
        })

        it('should transfer token from one owner to another', async function () { 
            const tokenId = 10;
            await erc721Contract.mint(accounts[1], tokenId, { from: owner });

            await erc721Contract.approve(accounts[2], tokenId, { from: accounts[1] });
            await erc721Contract.transferFrom(accounts[1], accounts[3], tokenId, { from: accounts[2] });

            const tokenOwner = await erc721Contract.ownerOf.call(tokenId);
            assert.equal(tokenOwner, accounts[3], "Token owner not correct");
        })

        it('should transfer token from one owner to another', async function () { 
            const tokenId = 100;
            await erc721Contract.mint(accounts[4], tokenId, { from: owner });

            await erc721Contract.setApprovalForAll(accounts[5], true, { from: accounts[4] });
            const r = await erc721Contract.transferFrom(accounts[4], accounts[6], tokenId, { from: accounts[5] });

            const tokenOwner = await erc721Contract.ownerOf.call(tokenId);
            assert.equal(tokenOwner, accounts[6], "Token owner not correct");
        })        
    });

    describe("ERC721Enumerable", async () => {
        let erc721EnumerableContract;
        before(async function () { 
            erc721EnumerableContract = await ERC721Mintable.new("EthLand", "ETL");
        })
        it('should return total supply', async function () { 
            for (let i = 0; i < 10; i++) {
                await erc721EnumerableContract.mint(accounts[1], i, { from: owner });
            }
            const totalSupply = await erc721EnumerableContract.totalSupply.call();
            assert.equal(totalSupply.toNumber(), 10, "Total supply not correct");
        })
    });

    describe("ERC721Metadata", async () => {
        let erc721MetadataContract;
        before(async function () { 
            erc721MetadataContract = await ERC721Mintable.new("EthLand", "ETL");
        })
        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const tokenId = 1;

            await erc721MetadataContract.mint(accounts[1], tokenId, { from: owner });
            const tokenUri = await erc721MetadataContract.tokenURI.call(tokenId, { from: accounts[1] });
            assert.equal(tokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Token URI not correct");
        })
    });
})