//const SHA256 =require('crypto-js/sha256');locate this in chain-util.js
const{DIFFICULTY,MINE_RATE} =require('../config');
const ChainUtil = require ('../chain-util');


class Block{
constructor(timestamp,lastHash,hash,data,nonce,difficulty){
this.timestamp=timestamp;
this.lastHash=lastHash;
this.hash=hash;
this.data=data;
this.nonce =nonce;
this.difficulty= difficulty||DIFFICULTY;

  }
  // this will help in debugging
  toString(){
    return `Block -
    Timestamp:${this.timestamp}
    Last Hash:${this.lastHash.substring(0,10)}
    Hash     :${this.hash.substring(0,10)}
    Nonce    :${this.nonce}
    Difficulty:${this.difficulty}
    Data     :${this.data}`;
  }
 //making genesis block
  static genesis(){
    return new this('Genesis Time','----','f1r57-h45h',[],0,DIFFICULTY);
  }
  //mine block
  static mineBlock(lastBlock,data){
    let hash,timestamp;

    const lastHash = lastBlock.hash;
    let{difficulty} = lastBlock;
    let nonce =0;
  do{
    nonce++;
    timestamp = Date.now();
    difficulty = Block.adjustDifficulty(lastBlock,timestamp);
    hash = Block.hash(timestamp,lastHash,data,nonce,difficulty);


  }
  while(hash.substring(0,difficulty)!=='0'.repeat(difficulty));
    return new this(timestamp,lastHash,hash,data,nonce,difficulty);

  }
  static hash(timestamp,lastHash,data,nonce,difficulty){
    return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }
  static blockHash(block){
    const {timestamp,lastHash,data,nonce,difficulty} = block;
    return Block.hash(timestamp,lastHash,data,nonce,difficulty);
  }

  static adjustDifficulty(lastBlock,currentTime){
    let{difficulty} = lastBlock;
    difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1:difficulty-1;
    return difficulty;
  }
}
module.exports = Block;
//Last Hash:${this.lastHash.substring(0,10)}this line will shorten the hash address since it is a very long address to shorten this we have used substring function
