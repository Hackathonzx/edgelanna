// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import { IWorldID } from "./interfaces/IWorldID.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SkillToken is ERC721 {
    mapping(uint256 => string) private tokenURIs;
    IWorldID internal immutable worldId;
    uint256 internal immutable externalNullifier;
    uint256 internal immutable groupId = 1;
    uint256 public tokenCount;
    mapping(uint256 => bool) internal nullifierHashes;

    event TokenMinted(address indexed user, uint256 tokenId, string skill);

    constructor(
        string memory _name,
        string memory _symbol,
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) ERC721(_name, _symbol) {
        worldId = _worldId;
        externalNullifier = uint256(keccak256(abi.encodePacked(_appId, _actionId)));
    }

    function mintSkillToken(
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        string memory skill
    ) external {
        require(!nullifierHashes[nullifierHash], "Invalid nullifier");
        worldId.verifyProof(
            root,
            groupId,
            uint256(keccak256(abi.encodePacked(msg.sender))),
            nullifierHash,
            externalNullifier,
            proof
        );

        nullifierHashes[nullifierHash] = true;
        tokenCount++;
        _mint(msg.sender, tokenCount);
        tokenURIs[tokenCount] = skill;

        emit TokenMinted(msg.sender, tokenCount, skill);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) external {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not authorized");
        tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return tokenURIs[tokenId];
    }
}
