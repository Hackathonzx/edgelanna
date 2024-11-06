// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import { IWorldID } from "./interfaces/IWorldID.sol";
import { SkillToken } from "./SkillToken.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract CrossChainSkillVerification is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    SkillToken public skillToken;
    IWorldID public worldId;
    address public oracle;  
    bytes32 public jobId;   
    uint256 public fee;     

    mapping(uint256 => bool) public processedNullifiers; 

    constructor(
        address _skillTokenAddress, 
        IWorldID _worldId, 
        address _oracle, 
        bytes32 _jobId, 
        uint256 _fee, 
        address _link
    ) {
        skillToken = SkillToken(_skillTokenAddress);
        worldId = _worldId;
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
        _setChainlinkToken(_link);
    }

    function verifyAndTransferSkillToken(
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        uint256 tokenId
    ) external {
        worldId.verifyProof(
            root,
            1,  
            uint256(keccak256(abi.encodePacked(msg.sender))),
            nullifierHash,
            0,  
            proof
        );

        require(skillToken.ownerOf(tokenId) == msg.sender, "Not the token owner");
        require(!processedNullifiers[nullifierHash], "Nullifier already used");
        processedNullifiers[nullifierHash] = true;

        requestCrossChainTransfer(msg.sender, tokenId);
    }

    function requestCrossChainTransfer(address user, uint256 tokenId) internal {
        Chainlink.Request memory request = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillCrossChainTransfer.selector
        );

        request._add("user", toAsciiString(user));
        request._addUint("tokenId", tokenId);

        _sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfillCrossChainTransfer(bytes32 _requestId, bool success) public recordChainlinkFulfillment(_requestId) {
        require(success, "Cross-chain transfer failed");
        emit CrossChainTransferSuccess(_requestId);
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    event CrossChainTransferSuccess(bytes32 indexed requestId);
}
