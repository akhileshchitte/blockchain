
const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
       for (let i = 1; i < this.chain.length; i++){
           const currentBlock = this.chain[i];
           const previousBlock = this.chain[i - 1];

           if (currentBlock.hash !== currentBlock.calculateHash()) {
               return false;
           }

           if (currentBlock.previousHash !== previousBlock.hash) {
               return false;
           }
       }

       return true;
   }

  }

  var akhileshChin = new Blockchain();
  akhileshChin.addBlock(new Block(3, "22/05/2021", {coin:100}, "0"));
  akhileshChin.addBlock(new Block(5, "22/05/2021", {coin:100}, "0"));
  console.log('Blockchain valid? ' + akhileshChin.isChainValid());
  console.log(JSON.stringify(akhileshChin, null, 4));

  akhileshChin.chain[1].data = {coin:100000};
  console.log('Blockchain valid? ' + akhileshChin.isChainValid());
