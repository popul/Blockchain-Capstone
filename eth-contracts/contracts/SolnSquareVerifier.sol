pragma solidity >=0.4.21 <0.6.0;

import "./SquareVerifier.sol";
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// contract SolnSquareVerifier is Ownable {
contract SolnSquareVerifier {

    // address private owner;
    SquareVerifier private squareVerifier;

    constructor() public {
    }

    function setSquareVerifierContract(address _SquareVerifier)
        public
        // onlyOwner
    {
        address addr = address(uint160(_SquareVerifier));
        squareVerifier = SquareVerifier(addr);
    }
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class



// TODO define a solutions struct that can hold an index & an address


// TODO define an array of the above struct


// TODO define a mapping to store unique solutions submitted



// TODO Create an event to emit when a solution is added



// TODO Create a function to add the solutions to the array and emit the event



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  


























