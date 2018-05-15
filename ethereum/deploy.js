const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledIcoTikebit = require("./build/tikebitCoin.json");

const provider = new HDWalletProvider(
  "crash setup pony elegant fantasy cute cute bread among amount hub pond",
  "https://rinkeby.infura.io/tfQAVgnTVnzV4xe6g1ao "
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledIcoTikebit.interface)
  )
    .deploy({ data: "0x" + compiledIcoTikebit.bytecode })
    .send({ gas: "3000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
