var ERC721Mintable = artifacts.require('ERC721Mintable');

const Ownable = artifacts.require('Ownable');
const Pausable = artifacts.require('Pausable');

contract('TestERC721Mintable', accounts => {

    const owner = accounts[0];

    describe('Ownable', async () => {
        let ownableContract;
        before(async () => {
            ownableContract = await Ownable.deployed();
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
            pausableContract = await Pausable.deployed();
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

    xdescribe('match erc721 spec', function () {
        beforeEach(async function () { 
            // this.contract = await EERC721Mintable.new({from: account_one});

            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () { 
            
        })

        it('should get token balance', async function () { 
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    xdescribe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: owner});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})