//
// Copyright 2017 Christian Reitwiessner
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
pragma solidity ^0.4.14;
library Pairing {
    struct G1Point {
        uint X;
        uint Y;
    }
    // Encoding of field elements is: X[0] * z + X[1]
    struct G2Point {
        uint[2] X;
        uint[2] Y;
    }
    /// @return the generator of G1
    function P1() pure internal returns (G1Point) {
        return G1Point(1, 2);
    }
    /// @return the generator of G2
    function P2() pure internal returns (G2Point) {
        // Original code point
        return G2Point(
            [11559732032986387107991004021392285783925812861821192530917403151452391805634,
             10857046999023057135944570762232829481370756359578518086990519993285655852781],
            [4082367875863433681332203403145435568316851327593401208105741076214120093531,
             8495653923123431417604973247489272438418190587263600148770280649306958101930]
        );

/*
        // Changed by Jordi point
        return G2Point(
            [10857046999023057135944570762232829481370756359578518086990519993285655852781,
             11559732032986387107991004021392285783925812861821192530917403151452391805634],
            [8495653923123431417604973247489272438418190587263600148770280649306958101930,
             4082367875863433681332203403145435568316851327593401208105741076214120093531]
        );
*/
    }
    /// @return the negation of p, i.e. p.addition(p.negate()) should be zero.
    function negate(G1Point p) pure internal returns (G1Point) {
        // The prime q in the base field F_q for G1
        uint q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
        if (p.X == 0 && p.Y == 0)
            return G1Point(0, 0);
        return G1Point(p.X, q - (p.Y % q));
    }
    /// @return the sum of two points of G1
    function addition(G1Point p1, G1Point p2) view internal returns (G1Point r) {
        uint[4] memory input;
        input[0] = p1.X;
        input[1] = p1.Y;
        input[2] = p2.X;
        input[3] = p2.Y;
        bool success;
        assembly {
            success := staticcall(sub(gas, 2000), 6, input, 0xc0, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
    }
    /// @return the product of a point on G1 and a scalar, i.e.
    /// p == p.scalar_mul(1) and p.addition(p) == p.scalar_mul(2) for all points p.
    function scalar_mul(G1Point p, uint s) view internal returns (G1Point r) {
        uint[3] memory input;
        input[0] = p.X;
        input[1] = p.Y;
        input[2] = s;
        bool success;
        assembly {
            success := staticcall(sub(gas, 2000), 7, input, 0x80, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require (success);
    }
    /// @return the result of computing the pairing check
    /// e(p1[0], p2[0]) *  .... * e(p1[n], p2[n]) == 1
    /// For example pairing([P1(), P1().negate()], [P2(), P2()]) should
    /// return true.
    function pairing(G1Point[] p1, G2Point[] p2) view internal returns (bool) {
        require(p1.length == p2.length);
        uint elements = p1.length;
        uint inputSize = elements * 6;
        uint[] memory input = new uint[](inputSize);
        for (uint i = 0; i < elements; i++)
        {
            input[i * 6 + 0] = p1[i].X;
            input[i * 6 + 1] = p1[i].Y;
            input[i * 6 + 2] = p2[i].X[0];
            input[i * 6 + 3] = p2[i].X[1];
            input[i * 6 + 4] = p2[i].Y[0];
            input[i * 6 + 5] = p2[i].Y[1];
        }
        uint[1] memory out;
        bool success;
        assembly {
            success := staticcall(sub(gas, 2000), 8, add(input, 0x20), mul(inputSize, 0x20), out, 0x20)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
        return out[0] != 0;
    }
    /// Convenience method for a pairing check for two pairs.
    function pairingProd2(G1Point a1, G2Point a2, G1Point b1, G2Point b2) view internal returns (bool) {
        G1Point[] memory p1 = new G1Point[](2);
        G2Point[] memory p2 = new G2Point[](2);
        p1[0] = a1;
        p1[1] = b1;
        p2[0] = a2;
        p2[1] = b2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for three pairs.
    function pairingProd3(
            G1Point a1, G2Point a2,
            G1Point b1, G2Point b2,
            G1Point c1, G2Point c2
    ) view internal returns (bool) {
        G1Point[] memory p1 = new G1Point[](3);
        G2Point[] memory p2 = new G2Point[](3);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for four pairs.
    function pairingProd4(
            G1Point a1, G2Point a2,
            G1Point b1, G2Point b2,
            G1Point c1, G2Point c2,
            G1Point d1, G2Point d2
    ) view internal returns (bool) {
        G1Point[] memory p1 = new G1Point[](4);
        G2Point[] memory p2 = new G2Point[](4);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p1[3] = d1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        p2[3] = d2;
        return pairing(p1, p2);
    }
}
contract Verifier {
    using Pairing for *;
    struct VerifyingKey {
        Pairing.G1Point alfa1;
        Pairing.G2Point beta2;
        Pairing.G2Point gamma2;
        Pairing.G2Point delta2;
        Pairing.G1Point[] IC;
    }
    struct Proof {
        Pairing.G1Point A;
        Pairing.G2Point B;
        Pairing.G1Point C;
    }
    function verifyingKey() pure internal returns (VerifyingKey vk) {
        vk.alfa1 = Pairing.G1Point(7617618607879363707511268917731324991595860952297360226729249244486668701262,17850814258485055595115245541366587795314250794631443604053259668762601380934);
        vk.beta2 = Pairing.G2Point([17687006244068563766835381834920045433387441031281669475210118018310735810455,1756979868565466378425897034658531518142470140948728678781255033402851815327], [20679501172832182830595566349734343118927906333960079437248352624388612651085,1015078033005106099851272950069409927498909719328768937487423748082340275072]);
        vk.gamma2 = Pairing.G2Point([4189208012499429874938505405117253250997467916068276531288404146826046757686,19371075856211109448807532840613746226127787149970430485102870263137383269045], [13892643657347176279516353763101319773165463387125058072084414383921612260423,2557217280418978992157912050365278157940319370998726863322491936550055935829]);
        vk.delta2 = Pairing.G2Point([6162009391964794518535610538505461177922794113385574535126238546780196847542,7717062419583587053093577160929072548188011248006212068754112945435791159573], [17453272715345703498748220528410639920217985705668206875950763686565695663720,10413934386965744566464678594545945274045142305722054044156696058263017476896]);
        vk.IC = new Pairing.G1Point[](13);
        vk.IC[0] = Pairing.G1Point(14105824896471300153965099356625409734374997117349366022377088954303939946596,2004890774649805947780343117137671900544316389750423269912188001378443346558);
        vk.IC[1] = Pairing.G1Point(21523293295191279233514747069676079827600370393470519410211740025615432380199,20315719373973162387794881856304410594764518614096475323650583360639892550114);
        vk.IC[2] = Pairing.G1Point(9482975612926949329837773961932485803486761702486094574376083051720986725082,10286658272396560553358643485770586152003151008357043330821158457561776887948);
        vk.IC[3] = Pairing.G1Point(21877776958933932547181404867384425195016162396492648064611418328058920100899,7747113797033926039065410752642416258086535860929073493098534969770202199599);
        vk.IC[4] = Pairing.G1Point(3517319998352597390781751481591929890222943902504973755861578427620135256284,11361122954315825619857156040503547598817802623451870538173012753616758211638);
        vk.IC[5] = Pairing.G1Point(1186161379551452894097160048867183919705366911174162276213064304643741596762,11658040473250290242022488485040066565236452953213557919646146174900884321371);
        vk.IC[6] = Pairing.G1Point(7894819559636510083934820918520398912798176157048272669711398549506743861373,7002618293616157417838834142229744797829439008815206742269639171896690598179);
        vk.IC[7] = Pairing.G1Point(3879902109862802917640749903264624389504441046075461613183847913164711078255,1401472013443938235651073577864267824933740419443463220131562295508118948098);
        vk.IC[8] = Pairing.G1Point(410824763855487505266096071386954167578672243866869766412763383023331426809,8091938162345731229921395417499968560890283477158169911972399418775817675026);
        vk.IC[9] = Pairing.G1Point(8251239770192390917307145753260781091081346326800816634863601805310793208636,15681780308790929109630389516936576638362581672698352992893609805459984980105);
        vk.IC[10] = Pairing.G1Point(9854221054742299142216032807711040585027841226467638986622274425863968183354,2208134083267369073641621294920047197339884805455705956949914393300674936334);
        vk.IC[11] = Pairing.G1Point(7914753417419429473916233360841851712945978877792510176732689088471085122482,1498153809426756965738082740952500781888233968087921559267738850813837865022);
        vk.IC[12] = Pairing.G1Point(2418980981698627045530677966733118919802288468101769548677415068135090754398,9413435032931283733620622119768737765174585181885796386721623865917603476658);

    }
    function verify(uint[] input, Proof proof) view internal returns (uint) {
        VerifyingKey memory vk = verifyingKey();
        require(input.length + 1 == vk.IC.length);
        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);
        for (uint i = 0; i < input.length; i++)
            vk_x = Pairing.addition(vk_x, Pairing.scalar_mul(vk.IC[i + 1], input[i]));
        vk_x = Pairing.addition(vk_x, vk.IC[0]);
        if (!Pairing.pairingProd4(
            Pairing.negate(proof.A), proof.B,
            vk.alfa1, vk.beta2,
            vk_x, vk.gamma2,
            proof.C, vk.delta2
        )) return 1;
        return 0;
    }
    function verifyProof(
            uint[2] a,
            uint[2][2] b,
            uint[2] c,
            uint[12] input
        ) view public returns (bool r) {
        Proof memory proof;
        proof.A = Pairing.G1Point(a[0], a[1]);
        proof.B = Pairing.G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]);
        proof.C = Pairing.G1Point(c[0], c[1]);
        uint[] memory inputValues = new uint[](input.length);
        for(uint i = 0; i < input.length; i++){
            inputValues[i] = input[i];
        }
        if (verify(inputValues, proof) == 0) {
            return true;
        } else {
            return false;
        }
    }
}
