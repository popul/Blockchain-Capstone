pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2; 

import "./SquareVerifier.sol";
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is ERC721Mintable {
    SquareVerifier private squareVerifier;

    struct Solution {
        uint256 tokenId;
        address owner;
    }

    Solution[] private solutions;

    mapping(uint256 => Solution) private uniqueSolutions;

    event SolutionAdded(uint256 tokenId, address indexed owner);

    function getSolutionHash(SquareVerifier.Proof memory proof, uint256[2] memory inputs)
        private
        returns (uint256)
    {
        return uint256(keccak256(abi.encodePacked(
            proof.a.X, proof.a.Y,
            proof.b.X[0], proof.b.Y[0], proof.b.X[1], proof.b.Y[1],
            proof.c.X, proof.c.Y,
            inputs[0], inputs[1]
        )));
    }

    modifier isUniqueSolution(SquareVerifier.Proof memory proof, uint256[2] memory inputs)
    {
        require(uniqueSolutions[getSolutionHash(proof, inputs)].owner == address(0), "Solution already exists");
        _;
    } 

    function addSolution(SquareVerifier.Proof memory proof, uint256[2] memory inputs,  address owner, uint256 tokenId) private {
        Solution memory solution = Solution(tokenId, owner);
        solutions.push(solution);

        uint256 solutionHash = getSolutionHash(proof, inputs);
        uniqueSolutions[solutionHash] = solution;

        emit SolutionAdded(tokenId, owner);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly

    function mint(SquareVerifier.Proof memory proof, uint256[2] memory inputs,  address to, uint256 tokenId) 
        public
        isUniqueSolution(proof, inputs)
        returns (bool)
    {
        require(address(squareVerifier) != address(0), "Verifier contract has not been set");
        require(squareVerifier.verifyTx(proof, inputs), "Solution is not valid");

        super.mint(to, tokenId);

        addSolution(proof, inputs, to, tokenId);
    }

    constructor(string memory name, string memory symbol)
        ERC721Mintable(name, symbol)
        public
    {
    }

    function setSquareVerifierContract(address _SquareVerifier)
        public
        onlyOwner
    {
        address addr = address(uint160(_SquareVerifier));
        squareVerifier = SquareVerifier(addr);
    }
}




  


























