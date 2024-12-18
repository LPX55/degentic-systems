// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.0;

import "../lib/Address.sol";
import "./interface/IMulticall.sol";

contract Multicall is IMulticall {
    function multicall(bytes[] calldata data) external returns (bytes[] memory results) {
        results = new bytes[](data.length);
        address sender = _msgSender();
        bool isForwarder = msg.sender != sender;
        for (uint256 i = 0; i < data.length; i++) {
            if (isForwarder) {
                results[i] = Address.functionDelegateCall(address(this), abi.encodePacked(data[i], sender));
            } else {
                results[i] = Address.functionDelegateCall(address(this), data[i]);
            }
        }
        return results;
    }
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}
