import web3 from "./web3";
import icoTikebit from "./build/tikebitCoin.json";

const instance = new web3.eth.Contract(
  JSON.parse(icoTikebit.interface),
  "0x51f6AFe8841d43e8668b18D7b3144d9D7D302576"
);

export default instance;
