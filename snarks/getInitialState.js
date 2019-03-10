const MIMC = require('./circomlib/src/mimc7.js')

let leafs_ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//console.log(leafs_.length);
let elms = [0, 3]

function merkleTree(leafs, elements_to_proof){
 var i;
 var j;
 var h;
 const hash_leafs = leafs.map(x => MIMC.multiHash([x]));
 const hash_leafs_l = [[],[],[],[],[],[],[]];
 var tmp_elements_to_proof = elements_to_proof;
 const proofs = [[],[]];

 const tmp1 = elements_to_proof[0].toString(2).padStart(6,'0').split('').reverse();
 const tmp2 = elements_to_proof[1].toString(2).padStart(6,'0').split('').reverse();
 const paths = [tmp1.map(x => parseInt(x,10)),
     tmp2.map(x => parseInt(x,10))];

 //console.log(hash_leafs);
 hash_leafs_l[0] = hash_leafs;
 console.log(hash_leafs_l[0]);

 for (h = 1; h<7;h++){
  for (i = 0; i<parseInt(64/2**(h));i++){
   for (j = 0; j<2;j++){
    if (tmp_elements_to_proof[j] == 2*i){
     proofs[j].push(hash_leafs_l[h-1][2*i+1]);
    } else if (tmp_elements_to_proof[j] == 2*i+1){
     proofs[j].push(hash_leafs_l[h-1][2*i]);
    }
   }
   //console.log(h, i);
  hash_leafs_l[h].push(MIMC.multiHash([hash_leafs_l[h-1][2*i],hash_leafs_l[h-1][2*i+1]]))
  }
  tmp_elements_to_proof = tmp_elements_to_proof.map(x => Math.floor(x/2))
  console.log(hash_leafs_l[h]);
 }

 return [MIMC.multiHash([hash_leafs_l[5][0],hash_leafs_l[5][1]]), proofs, paths];
}

var t = merkleTree(leafs_, elms);
var elm_index = 1;

var cur_hash = MIMC.multiHash([0]);
console.log('root: ', t[0]);
for (var h = 0; h < 6; h++) {
  console.log('cur_hash: ', cur_hash);
  console.log('proof: ', t[1][elm_index][h]);
  console.log('index: ', t[2][elm_index][h]);
  if (t[2][elm_index][h] == 0) {
    console.log('left');
    cur_hash = MIMC.multiHash([cur_hash, t[1][elm_index][h]]);
  } else {
    console.log('right');
    cur_hash = MIMC.multiHash([t[1][elm_index][h], cur_hash]);
  }
}
console.log(t);