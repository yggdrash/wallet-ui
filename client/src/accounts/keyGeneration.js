const Wallet = require("./wallet.js");
const util = require("../utils");

const ksHelper = {
  create: function(password) {
    const wallet = Wallet.generate();
    const address = wallet.getChecksumAddressString();
    const params = {
      n: 4096
    };
    const keystoreData = JSON.stringify(wallet.toV3(password, params));
    return { address: address, keystoreData: keystoreData };
  },

  signTx: function(keystoreData, password, msg) {
    const signature = ksHelper.signWithPK(
      ksHelper.getPrivateKey(keystoreData, password),
      msg.toString("hex")
    );
    return signature;
  },

  getPrivateKey: function(keystoreData, password) {
    return Wallet.fromV3(keystoreData, password).getPrivateKey();
  },

  signWithPK: function(privateKey, msg) {
    return util.ecsign(new Buffer(util.stripHexPrefix(msg), "hex"), new Buffer(privateKey, "hex"));
  }
};

export default ksHelper;
