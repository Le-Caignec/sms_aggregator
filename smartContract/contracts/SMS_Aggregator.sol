// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SMS_Aggregator {
    // Define a struct
    struct Secret {
        string key;
        uint date;
        string description;
    }
    mapping(address => uint) private secretCounts;
    mapping(address => mapping(uint => Secret)) private people;

    // Event
    event SecretAdded(
        address indexed _from,
        string key,
        uint date,
        string description
    );

    //constructor
    constructor() {}

    // Add a secret
    function addSecret(
        string memory _key,
        uint _date,
        string memory _description
    ) public {
        uint _index = secretCounts[msg.sender] + 1;
        people[msg.sender][_index] = Secret(_key, _date, _description);
        secretCounts[msg.sender]++;
        emit SecretAdded(msg.sender, _key, _date, _description);
    }

    // Get all of my scret
    function getMyScret() public view returns (Secret[] memory) {
        uint _count = secretCounts[msg.sender];
        Secret[] memory _screts = new Secret[](_count);
        for (uint i = 0; i < _count; i++) {
            _screts[i] = people[msg.sender][i + 1];
        }
        return _screts;
    }
}
