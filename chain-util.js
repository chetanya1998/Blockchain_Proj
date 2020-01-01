const EC = require('elliptic').ec;
const SHA256 =require('crypto-js/sha256');
const ec = new EC('secp256k1');
//cryptographic algorithm 256 represents 256 bits k represents koblet name of mathematician
const uuidV1 = require('uuid/v1');
class ChainUtil{
  static genKeyPair(){
    return ec.genKeyPair();
  }

  static id(){
    return uuidV1();
  }

  static hash(data){
    return SHA256(JSON.stringify(data)).toString();
  }
  //this function will be used for the purpose of verifying the transaction by verifying digital signature
  static verifySignature(publicKey, signature, dataHash) {
	return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
}
}

module.exports = ChainUtil;
//elliptic algorithm uses secp2561 algorithm of cryptography
