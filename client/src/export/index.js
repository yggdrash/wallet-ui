const   path = require("path"),
    fs = require("fs");

const privateKeyLocation = path.join(__dirname, "privateKey");

const initWallet = () => {
  if (fs.existsSync(privateKeyLocation)) {
    return;
  }
//   const newPrivateKey = generatePrivateKey();

//   fs.writeFileSync(privateKeyLocation, newPrivateKey);
};

module.exports = {
  initWallet
};
