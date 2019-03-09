import * as Bn from "../../../node_modules/bn.js/lib/bn.js";

export class BabyjubjubService {

  a = new Bn('168700', 10);
  d = new Bn('168696', 10);
  g = [new Bn('17777552123799933955779906779655732241715742912184938656739573121738514868268', 10),
  new Bn('2626589144620713026669568689430873010625803728049924121243784502389097019475', 10)];

  q = new Bn('21888242871839275222246405745257275088548364400416034343698204186575808495617', 10);

  zero =[new Bn('0', 10),new Bn('1', 10)];

  assertOnCurve (P) {
    var uu = P[0].mul(P[0]);
    var vv = P[1].mul(P[1]);
    var left = (this.a.mul(uu).add(vv)).umod(this.q);
    var right = this.d.mul(uu).mul(vv).addn(1).umod(this.q);
    console.log(left.eq(right));
    return left.eq(right);
  }

  add (P1, P2){
    var u = P1[0], v = P1[1];
    var x = P2[0], y = P2[1];
    var allMul = this.d.mul(u).mul(v).mul(x).mul(y);
    var xtop = (u.mul(y).add(x.mul(v))).umod(this.q);

    var du = (xtop.mul((allMul.addn(1)).invm(this.q))).umod(this.q);

    var ytop = v.mul(y).sub(this.a.mul(u).mul(x));
    var dv = (ytop.mul((allMul.neg().addn(1)).invm(this.q))).umod(this.q);
    return [du, dv];
  }

  multiply (exp, P){
    var R0 = this.zero;
    var R1 = P;
    var exp_bin = exp.toString(2, 253);
    for (var i=252; i>=0; i--) {
      if (exp_bin.charAt(i) == '1'){
        R0 = this.add(R0, R1);
      }
      R1 = this.add(R1, R1);
    }
    return R0;
  }

}