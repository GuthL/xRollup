const snarkjs = require('snarkjs')
const bigInt = snarkjs.bigInt

const generateRollupPrivateKey = hashFn => {
  const hash = hashFn('' + Math.random())
  const bigInt_hash = bigInt(hash, 16)
  const bigInt_refHash = bigInt(
    '21888242871839275222246405745257275088548364400416034343698204186575808495617'
  )
  return bigInt_hash.mod(bigInt_refHash).toString(16)
}

export default generateRollupPrivateKey
