pragma solidity ^0.5.0;

interface IDepositVerifier {
    function verifyProof(uint[2] calldata a, uint[2][2] calldata b, uint[2] calldata c, uint[12] calldata input) view external returns (bool r);
}