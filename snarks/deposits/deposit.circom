include "../circomlib/circuits/mimc.circom";
include "../circomlib/circuits/eddsamimc.circom";
include "../circomlib/circuits/bitify.circom";

template Main(n,k) {
    signal input current_state;

    signal input last_index;
    
    signal input pubkey[k][2];
    signal input deposit[k];
    signal input token_type[k];

    signal private input paths2root[k][n-1];
    
    // Needed to avoid a DDoS
    // signal private input R8x[k];
    // signal private input R8y[k];
    // signal private input S[k];

    signal output new_state;
    signal output new_index;

    var i
    var j;
    
    last_index < 2**n;

    // computes account 
    component old_hash[k];
    component new_hash[k];

    component n2b[k];
    component old_merkle[k][n-1];
    component new_merkle[k][n-1];
    component verifier[k]
    
    var tmp_state = current_state;
    var tmp_index = last_index;
    //get path to root
    for (i=0;i<k;i++){
        n2b[i] = Num2Bits(n-1);
        tmp_index = tmp_index+i;
        n2b[i].in <== tmp_index;

        old_hash[i] = MultiMiMC7(1,91);
        old_hash[i].in[0] <== 0;

        old_merkle[i][0] = MultiMiMC7(2,91);
        old_merkle[i][0].in[0] <== old_hash[i].out - n2b[i].out[0]* (old_hash[i].out - paths2root[i][0]);
        old_merkle[i][0].in[1] <== paths2root[i][0] - n2b[i].out[0]* (paths2root[i][0] - old_hash[i].out);

        for (j=1; j<n-1; j++){
            old_merkle[i][j] = MultiMiMC7(2,91);
            old_merkle[i][j].in[0] <== old_merkle[i][j-1].out - n2b[i].out[j]* (old_merkle[i][j-1].out - paths2root[i][j]);
            old_merkle[i][j].in[1] <== paths2root[i][j] - n2b[i].out[j]* (paths2root[i][j] - old_merkle[i][j-1].out);
            }

        tmp_state === old_merkle[i][n-2].out;

        // Needed to avoid a DDoS
        // verifier[i] = EdDSAMiMCVerifier();   
        // verifier[i].enabled <== 1;
        // verifier[i].Ax <== pubkey[i][0];
        // verifier[i].Ay <== pubkey[i][1];
        // verifier[i].R8x <== R8x[i];
        // verifier[i].R8y <== R8y[i];
        // verifier[i].S <== S[i];
        // verifier[i].M <== pubkey[i][0];

        new_hash[i] = MultiMiMC7(4,91);
        new_hash[i].in[0] <== pubkey[i][0];
        new_hash[i].in[1] <== deposit[i];
        new_hash[i].in[2] <== 0;
        new_hash[i].in[3] <== token_type[i];

        new_merkle[i][0] = MultiMiMC7(2,91);
        new_merkle[i][0].in[0] <== new_hash[i].out - n2b[i].out[0]* (new_hash[i].out - paths2root[i][0]);
        new_merkle[i][0].in[1] <== paths2root[i][0] - n2b[i].out[0]* (paths2root[i][0] - new_hash[i].out);

        for (j=1; j<n-1; j++){
            new_merkle[i][j] = MultiMiMC7(2,91);
            new_merkle[i][j].in[0] <== new_merkle[i][j-1].out - n2b[i].out[j]* (new_merkle[i][j-1].out - paths2root[i][j]);
            new_merkle[i][j].in[1] <== paths2root[i][j] - n2b[i].out[j]* (paths2root[i][j] - new_merkle[i][j-1].out);
            }
        tmp_state = new_merkle[i][n-2].out
        }
    
    new_state <== new_merkle[k-1][n-2].out;
    new_index <== last_index+k;

    }

component main = Main(6,2);