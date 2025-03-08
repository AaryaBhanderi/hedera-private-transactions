import snarkjs from "snarkjs";

export async function generateZKP(transactionHash) {
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    { transactionHash },
    "circuit.wasm",
    "proving_key.zkey"
  );
  return { proof, publicSignals };
}

export async function verifyZKP(proof, publicSignals) {
  const verificationKey = require("./verification_key.json");
  return await snarkjs.groth16.verify(verificationKey, publicSignals, proof);
}
