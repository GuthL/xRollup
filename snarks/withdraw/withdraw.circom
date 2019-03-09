include "./circuits/mimc.circom";
include "./circuits/eddsamimc.circom";
include "./circuits/bitify.circom";

template Main(n,k) {
    signal input current_state;
    
    signal private input pubkey[k][2];
    signal private input withdraw[k];
    signal private input nonce[k];
    signal private input token_balance[k];
    signal private input token_type[k];

    signal private input withdraw_account[k];

    signal private input paths2root[k][n-1];
    signal private input paths2root_pos[k][n-1];

    signal private input R8x[k];
    signal private input R8y[k];
    signal private input S[k];

    signal output withdraw_account[k];
    signal output token_type[k];
    signal output new_state;

    var i
    var j;
    
    // computes account 
    component old_hash[k];
    component new_hash[k];
    component old_merkle[k][n-1];
    component new_merkle[k][n-1];
  
    var tmp_state = current_state;

    //get path to root
    for (i=0;i<k;i++){

        component old_hash[i] = MultiMiMC7(4,91);
        old_hash[i].in[0] <== pubkey[i][0];
        old_hash[i].in[1] <== token_balance;
        old_hash[i].in[2] <== nonce;
        old_hash[i].in[3] <== token_type;

        old_merkle[i][0] = MultiMiMC7(2,91);
        old_merkle[i][0].in[0] <== old_hash[i].out - paths2root_pos[i].out[0]* (old_hash[i].out - paths2root[i][0]);
        old_merkle[i][0].in[1] <== paths2root[i][0] - paths2root_pos[i].out[0]* (paths2root[i][0] - old_hash[i].out);

        for (j=1; j<n-1; j++){
            old_merkle[i][j] = MultiMiMC7(2,91);
            old_merkle[i][j].in[0] <== old_merkle[i][j-1].out - paths2root_pos[i].out[j]* (old_merkle[i][j-1].out - paths2root[i][j]);
            old_merkle[i][j].in[1] <== paths2root[i][j] - paths2root_pos[i].out[j]* (paths2root[i][j] - old_merkle[i][j-1].out);
            }

        tmp_state === old_merkle[i][n-2].out;

        transaction[i] = MultiMiMC7(2,91);
        transaction[i].in[0] <== old_hash[i].out;
        transaction[i].in[1] <== withdraw_account[i];
        transaction[i].in[2] <== nonce_to;
        transaction[i].in[3] <== token_type_to;

        verifier[i] = EdDSAMiMCVerifier();   
        verifier[i].enabled <== 1;
        verifier[i].Ax <== pubkey[i][1];
        verifier[i].Ay <== pubkey[i][0];
        verifier[i].R8x <== R8x[i];
        verifier[i].R8y <== R8y[i];
        verifier[i].S <== S[i];
        verifier[i].M <== transaction[i].out;

        // balance checks
        token_balance[i]-withdraw[i] <= token_balance[i];

        nonce_from != NONCE_MAX_VALUE;

        new_hash[i] = MultiMiMC7(4,91);
        new_hash[i].in[0] <== pubkey[i][0];
        new_hash[i].in[1] <== token_balance[i]-withdraw[i] ;
        new_hash[i].in[2] <== nonce+1;
        new_hash[i].in[3] <== token_type[i];

        new_merkle[i][0] = MultiMiMC7(2,91);
        new_merkle[i][0].in[0] <== new_hash[i].out - paths2root_pos[i].out[0]* (new_hash[i].out - paths2root[i][0]);
        new_merkle[i][0].in[1] <== paths2root[i][0] - paths2root_pos[i].out[0]* (paths2root[i][0] - new_hash[i].out);

        for (j=1; j<n-1; j++){
            new_merkle[i][j] = MultiMiMC7(2,91);
            new_merkle[i][j].in[0] <== new_merkle[i][j-1].out - paths2root_pos[i].out[j]* (new_merkle[i][j-1].out - paths2root[i][j]);
            new_merkle[i][j].in[1] <== paths2root[i][j] - paths2root_pos[i].out[j]* (paths2root[i][j] - new_merkle[i][j-1].out);
            }
        tmp_state = new_merkle[i][n-2].out
        }
    
    new_state <== new_merkle[k-1][n-2].out;
    signal output withdraw_account[k];
    signal output token_type[k];
    signal output withdraw[k];
    }

component main = Main(6,2);