include "../circomlib/circuits/mimc.circom";
include "../circomlib/circuits/eddsamimc.circom";

template Main(n,k) {
    signal input current_state;

    signal private input paths2old_root_from[k][n-1];
    signal private input paths2old_root_to[k][n-1];
    signal private input paths2new_root_from[k][n-1];
    signal private input paths2new_root_to[k][n-1];

    signal private input paths2root_from_pos[k][n-1];
    signal private input paths2root_to_pos[k][n-1];
    
    signal private input pubkey[k][2];
    signal private input nonce_from[k];
    signal private input token_balance_from[k];
    signal private input token_type_from[k];

    signal private input R8x[k];
    signal private input R8y[k];
    signal private input S[k];

    signal private input to[k];
    signal private input nonce_to[k];
    signal private input token_balance_to[k];
    signal private input token_type_to[k];

    signal private input amount[k];

    signal output out;

    var i;
    var j;

    var NONCE_MAX_VALUE = 100;

    component old_hash_from[k];
    component old_merkle_from[k][n-1];

    component old_hash_to[k];
    component old_merkle_to[k][n-1];

    component transactions[k];
    component verifier[k];

    component new_hash_from[k];
    component new_merkle_from[k][n-1];

    component new_hash_to[k];
    component new_merkle_to[k][n-1];

    var tmp_state = current_state;

    for (i=0;i<k;i++){
        // accounts existence check
        old_hash_from[i] = MultiMiMC7(4,91);
        old_hash_from[i].in[0] <== pubkey[i][0];
        old_hash_from[i].in[1] <== token_balance_from[i];
        old_hash_from[i].in[2] <== nonce_from[i];
        old_hash_from[i].in[3] <== token_type_from[i];

        old_merkle_from[i][0] = MultiMiMC7(2,91);
        old_merkle_from[i][0].in[0] <== old_hash_from[i].out - paths2root_from_pos[i][0]* (old_hash_from[i].out - paths2old_root_from[i][0]);
        old_merkle_from[i][0].in[1] <== paths2old_root_from[i][0] - paths2root_from_pos[i][0]* (paths2old_root_from[i][0] - old_hash_from[i].out);
    
        for (j=1; j<n-1; j++){
        	old_merkle_from[i][j] = MultiMiMC7(2,91);
        	old_merkle_from[i][j].in[0] <== old_merkle_from[i][j-1].out - paths2root_from_pos[i][j]* (old_merkle_from[i][j-1].out - paths2old_root_from[i][j]);
            old_merkle_from[i][j].in[1] <== paths2old_root_from[i][j] - paths2root_from_pos[i][j]* (paths2old_root_from[i][j] - old_merkle_from[i][j-1].out);
            }

        tmp_state === old_merkle_from[i][n-2].out;

        old_hash_to[i] = MultiMiMC7(4,91);
        old_hash_to[i].in[0] <== pubkey[i][0];
        old_hash_to[i].in[1] <== token_balance_to[i];
        old_hash_to[i].in[2] <== nonce_to[i];
        old_hash_to[i].in[3] <== token_type_to[i];

        old_merkle_to[i][0] = MultiMiMC7(2,91);
        old_merkle_to[i][0].in[0] <== old_hash_to[i].out - paths2root_to_pos[i][0]* (old_hash_to[i].out - paths2old_root_to[i][0]);
        old_merkle_to[i][0].in[1] <== paths2old_root_to[i][0] - paths2root_to_pos[i][0]* (paths2old_root_to[i][0] - old_hash_to[i].out);

        for (j=1; j<n-1; j++){
            old_merkle_to[i][j] = MultiMiMC7(2,91);
            old_merkle_to[i][j].in[0] <== old_merkle_to[i][j-1].out - paths2root_to_pos[i][j]* (old_merkle_to[i][j-1].out - paths2old_root_to[i][j]);
            old_merkle_to[i][j].in[1] <== paths2old_root_to[i][j] - paths2root_to_pos[i][j]* (paths2old_root_to[i][j] - old_merkle_to[i][j-1].out);
            }

        tmp_state === old_merkle_to[i][n-2].out;

        transactions[i] = MultiMiMC7(3,91);
        transactions[i].in[0] <== old_hash_from[i].out;
        transactions[i].in[1] <== old_hash_to[i].out;
        transactions[i].in[2] <== amount[i];

        // authorization check
        verifier[i] = EdDSAMiMCVerifier();   
        verifier[i].enabled <== 1;
        verifier[i].Ax <== pubkey[i][0];
        verifier[i].Ay <== pubkey[i][1];
        verifier[i].R8x <== R8x[i];
        verifier[i].R8y <== R8y[i];
        verifier[i].S <== S[i];
        verifier[i].M <== transactions[i].out;
        
        // balance checks
        token_balance_from[i] - amount[i] <= token_balance_from[i];
        token_balance_to[i] + amount[i] >= token_balance_to[i];

        nonce_from != NONCE_MAX_VALUE;
        token_type_from[i] === token_type_to[i];

        // accounts updates
        new_hash_from[i] = MultiMiMC7(4,91);
        new_hash_from[i].in[0] <== pubkey[i][0];
        new_hash_from[i].in[1] <== token_balance_from[i];
        new_hash_from[i].in[2] <== nonce_from[i];
        new_hash_from[i].in[3] <== token_type_from[i];

        new_merkle_from[i][0] = MultiMiMC7(2,91);
        new_merkle_from[i][0].in[0] <== new_hash_from[i].out - paths2root_from_pos[i][0]* (new_hash_from[i].out - paths2new_root_from[i][0]);
        new_merkle_from[i][0].in[1] <== paths2new_root_from[i][0] - paths2root_from_pos[i][0]* (paths2new_root_from[i][0] - new_hash_from[i].out);

        for (j=1; j<n-1; j++){
            new_merkle_from[i][j] = MultiMiMC7(2,91);
            new_merkle_from[i][j].in[0] <== new_merkle_from[i][j-1].out - paths2root_from_pos[i][j]* (new_merkle_from[i][j-1].out - paths2new_root_from[i][j]);
            new_merkle_from[i][j].in[1] <== paths2new_root_from[i][j] - paths2root_from_pos[i][j]* (paths2new_root_from[i][j] - new_merkle_from[i][j-1].out);
            }

        new_hash_to[i] = MultiMiMC7(4,91);
        new_hash_to[i].in[0] <== pubkey[i][0];
        new_hash_to[i].in[1] <== token_balance_to[i];
        new_hash_to[i].in[2] <== nonce_to[i];
        new_hash_to[i].in[3] <== token_type_to[i];

        new_merkle_to[i][0] = MultiMiMC7(2,91);
        new_merkle_to[i][0].in[0] <== new_hash_to[i].out - paths2root_to_pos[i][0]* (new_hash_to[i].out - paths2new_root_to[i][0]);
        new_merkle_to[i][0].in[1] <== paths2new_root_to[i][0] - paths2root_to_pos[i][0]* (paths2new_root_to[i][0] - new_hash_to[i].out);

        for (j=1; j<n-1; j++){
            new_merkle_to[i][j] = MultiMiMC7(2,91);
            new_merkle_to[i][j].in[0] <== new_merkle_to[i][j-1].out - paths2root_to_pos[i][j]* (new_merkle_to[i][j-1].out - paths2new_root_to[i][j]);
            new_merkle_to[i][j].in[1] <== paths2new_root_to[i][j] - paths2root_to_pos[i][j]* (paths2new_root_to[i][j] - new_merkle_to[i][j-1].out);
            }

       	new_merkle_from[i][n-2].out === new_merkle_to[i][n-2].out;
        tmp_state = new_merkle_from[i][n-2].out;
    
    }

    out <== new_merkle_to[k-1][n-2].out;
}

component main = Main(6,1);