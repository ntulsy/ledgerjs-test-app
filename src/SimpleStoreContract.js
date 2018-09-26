import createContract from "truffle-contract";

// our example includes a simple contract that allows to set and restore a value.
import SimpleStorageJSON from "./dapp/build/contracts/SimpleStorage.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  
export default class SimpleStorageContract {
  static async createWithWeb3(web3) {
    // initialize the contract and retrieve the deployed version
    // const SimpleStorage = createContract(SimpleStorageJSON);
    // SimpleStorage.setProvider(web3.currentProvider);
    // const contract = contractAddress
    //   ? await SimpleStorage.at(contractAddress)
    //   : await SimpleStorage.deployed();
    // return new SimpleStorageContract(contract);



    const contract = new web3.eth.Contract(SimpleStorageJSON.abi, contractAddress);
    debugger;
    return new SimpleStorageContract(contract);
  }

  constructor(contract) {
    this.contract = contract;
  }

  async get() {
    // retrieve the value of the contract
    const result = await this.contract.methods.get().call({
      from: "0x8Fd0de9e75155AfcC8A05Fb0D973528D7D9FA055"
    });
    debugger;
    // in truffle-contract, uint values are BigNumber instance so need to convert in our example:
    return result;
  }

  async set(value, account, gasPriceGWEI) {
    debugger;
    // estimate the gas limit cost we will need for the contract call
    // const estimatedGas = await this.contract.set.estimateGas(value, {
    //   from: account
    // });
    // // and add 50% to make sure it does not go out of gas
    // const gasCost = 1.5 * estimatedGas;
    // the gas price is configurable by the user. converting it in wei
    const gasPrice = gasPriceGWEI * 1000000000;
    // call the set function on the contract with our new value
    this.contract.methods.set(value).call({
      from: account,
      gasPrice,
      gasCost: 200000,
    }).then(console.log);
    // return res;
  }

  // we can also listen to the ValueChanged event
  listenValueChanged(fn) {
    // const event = this.contract.ValueChanged();
    // event.watch((error, result) => {
    //   if (!error) {
    //     fn(result.args.value.toNumber());
    //   }
    // });
    // return () => event.stopWatching();
  }
}
