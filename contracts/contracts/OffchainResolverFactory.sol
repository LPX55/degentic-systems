// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./OffchainResolver.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OffchainResolverFactory is Ownable {

    address public offchainResolver;

    event OffchainResolverCreated(address newOffchainResolverAddress);

    constructor(address _offchainResolver) Ownable(msg.sender) {
        offchainResolver = _offchainResolver;
    }

    function setOffchainResolverAddress(address _offchainResolverAddress) public onlyOwner {
        offchainResolver = _offchainResolverAddress;
    }

    function createOffchainResolver(string memory _url, address[] memory _signers) public {
        address clone = Clones.clone(offchainResolver);
        OffchainResolver(clone).initialize(_url, _signers);
        emit OffchainResolverCreated(clone);
    }

}
