import { getBalance, getNonce } from './rpc'

const circomlib = require('circomlib')
const eddsa = circomlib.eddsa
const mimcjs = circomlib.mimc7

const signer = (toAddress, amount) => {
  const xRollupPrivateKey = localStorage.getItem('xRollupPrivateKey')
  const xRollupPublicKey = localStorage
    .getItem('xRollupPublicKey')
    .split(',')
    .map(k => parseInt(k))

  const pubKey_to = toAddress

  const token_type_from = 'XXXX' // example, DAI samrt contract address
  const token_type_to = 'XXXX' // example, DAI samrt contract address

  const nonce_from = getNonce(xRollupPublicKey, token_type_from)
  const nonce_to = getNonce(xRollupPublicKey, token_type_from)

  const token_balance_from = getBalance(xRollupPublicKey, token_type_from)
  const token_balance_to = getBalance(xRollupPublicKey, token_type_to)

  const old_hash_leaf_from = mimcjs.multiHash([
    xRollupPublicKey[0],
    token_balance_from,
    nonce_from,
    token_type_from,
  ])
  const old_hash_leaf_to = mimcjs.multiHash([
    pubKey_to[0],
    token_balance_to,
    nonce_to,
    token_type_to,
  ])

  const msg = mimcjs.multiHash([old_hash_leaf_from, old_hash_leaf_to, amount])
  const signature = eddsa.signMiMC(xRollupPrivateKey, old_hash_leaf_from)

  return {
    pubkey: xRollupPublicKey.map(x => x.toString()),
    token_balance_from: token_balance_from.toString(),
    nonce: nonce_from.toString(),
    token_type: token_type_from.toString(),
    amount: amount.toString(),
    to: pubKey_to[0].toString(),
    token_balance_to: token_balance_to.toString(),
    nonce_to: nonce_to.toString(),
    token_type_to: token_type_to.toString(),
    msg: msg,
    R8x: signature.R8[0].toString(),
    R8y: signature.R8[1].toString(),
    S: signature.S.toString(),
  }
}

export default signer
