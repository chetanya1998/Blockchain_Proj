//this file has a purpose to test the block class
// const Block = require('./block');
// // const block = new Block('sanju','anmol','vishakha','chetanya');
// // console.log(block.toString());
// // //to test the genesis block
// // console.log(Block.genesis().toString());
// const fooBlock = Block.mineBlock(Block.genesis(),'foo');
// console.log(fooBlock.toString());
// const Blockchain = require ('./blockchain');


//const bc = new Blockchain();
// for(let i=0;i<10;i++){
//   console.log(bc.addBlock(`Naveen${i}`).toString());
// }

const Wallet =require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());
