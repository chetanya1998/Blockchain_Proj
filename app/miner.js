//developing miner system
const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner{
  constructor(blockchain,transactionPool,wallet,p2pServer){
    this.blockchain = blockchain;
    this.transactionPool =transactionPool;
    this.wallet= wallet;
    this.p2pserver=p2pServer;

  }
  //include a reward for the miner
  mine(){
    const validTransactions = this.transactionPool.validTransactions();
    validTransactions.push(
      Transaction.rewardTransaction(this.wallet,Wallet.blockchainWallet())
  );

    //create a block consisting of the valid validTransactions
    const block =this.blockchain.addBlock(validTransactions);
    this.p2pServer.syncChains();
    this.transactionPool.clear();
    this.p2pServer.broadcastClearTransactions();

    return block;
    //synchronize the chains in the peer to peer Server
    //clear the transaction TransactionPool
    //broadcast to every miner to clear their transaction pools
  }
}
module.exports = Miner;
