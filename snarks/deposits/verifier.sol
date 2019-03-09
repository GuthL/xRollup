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
        vk.alfa1 = Pairing.G1Point(19971370349991582130338799532955286346113850040753864893444745740362538764814,13745945229801533266186709218622354150637153289731181247120178239494766377207);
        vk.beta2 = Pairing.G2Point([12537911088516273213027943662492708395029408619172057415486425814930666531160,10264061706454513939266293636592724934403112872927586663846858054462207980585], [3960385265224363934678956373500665691682773509402497369893061908859244170119,4305193698688228919011121813017285567235318146211299721842233828658893264163]);
        vk.gamma2 = Pairing.G2Point([9172436443489167545295661855725007600730328748845371719972365457766338497235,17210574898924211634580005881574512653641568580681112531044479142129008985965], [7427752536810004105936184655569159829116897225481809632137623541560725055245,20956714231248740578893564994555900364022532492662545312464317748541754843518]);
        vk.delta2 = Pairing.G2Point([18069722843491022061067721631472694680052339584859010718353392535920530071588,11303146474442909222183307886367554569544934884966240998866447811957050372157], [18787271326836172969834114310508871887925021515398417650491360874407358577275,14979754994768540250765431189437641765288373509842542317598199037851184097837]);
        vk.IC = new Pairing.G1Point[](13);
        vk.IC[0] = Pairing.G1Point(20551906216606511084568038922477982700867649741388864359107508771086328968316,16478220386284388880287528612875139519844661210687189205344885399438175819191);
        vk.IC[1] = Pairing.G1Point(8662714041952386690135412389354630614866572783244358284622780083062882682882,17601496913679153947830836488225550181425381889905861160194501955186654489202);
        vk.IC[2] = Pairing.G1Point(13508000034240520395235742029144166544182507052812710814451907317854636848160,20095994039306787671886646542607499225911882788426471221206539138999620457787);
        vk.IC[3] = Pairing.G1Point(17123673908060739094402628691451467235516608350708313180790354386468490892058,738818466719544845048471382724970731545830098189266219158468649291265868665);
        vk.IC[4] = Pairing.G1Point(5891884478239289746687293536309780207573513415254169403443341448229977593593,6881742825838100692325610971895373799908888696445029759881939055141006297003);
        vk.IC[5] = Pairing.G1Point(14107867718141174068101543450642652277193914242473244425687196427675630594782,2099750326177701787040245839243183379623348082946141009720300796041883383981);
        vk.IC[6] = Pairing.G1Point(15277018794931119011695272976114295132094827533309588789156295878381783983792,7287809551092733563491203470101535567581825301174930461266419273709657567115);
        vk.IC[7] = Pairing.G1Point(21825353625769321391735009971052659306100697246236481360501991541454619182918,11126854934117831790606910558581253557508767676526384910673605043506716539859);
        vk.IC[8] = Pairing.G1Point(855554669119538198397838446659007916182944819960751814780278250018721783867,11655143516036847570147377257657988287167944250627047201361750608153118878719);
        vk.IC[9] = Pairing.G1Point(15768642783586309004832059277492564933001995626069702888985013564124813923797,14224374091958252569718658302577676986251827675030185709046287755087331804373);
        vk.IC[10] = Pairing.G1Point(513227815924322163071297098321268398855343640732882490167430202803129186488,936700342297436998964730383975232589842054388728989768761988502269590265945);
        vk.IC[11] = Pairing.G1Point(14152102389000263483320120072189305733054303386109945883625020507377170529021,4705525831669691439925381585063055550155438299670578737212365497989024686317);
        vk.IC[12] = Pairing.G1Point(20686129523568254525193398156747889816534947053871644789382141388226290289471,14019453879006682526529666730485293644883887148070086013676260676519803023566);

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
