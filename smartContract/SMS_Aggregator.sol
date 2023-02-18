// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SMS_Aggregator {
    // Define a struct
    struct Scret {
        string key;
        uint date;
        string description;
    }
    mapping(address => uint) private secretCounts;
    mapping(address => mapping(uint => Scret)) private people;

    // Event
    event ScretAdded(
        address indexed _from,
        string key,
        uint date,
        string description
    );

    // Add a secret
    function addScret(string memory _key, uint _date, string memory _description) public {
        uint _index = secretCounts[msg.sender] + 1;
        people[msg.sender][_index] = Scret(_key, _date, _description);
        secretCounts[msg.sender]++;
        emit ScretAdded(msg.sender, _key, _date, _description);
    }

    // Get all of my scret 
    function getMyScret() public view returns (Scret[] memory) {
        uint _count = secretCounts[msg.sender];
        Scret[] memory _screts = new Scret[](_count);
        for (uint i = 0; i < _count; i++) {
            _screts[i] = people[msg.sender][i + 1];
        }
        return _screts;
    }


}
