import React, { Component } from "react";
import DetailAccountMenuPresenter from "./DetailAccountMenuPresenter";
class DetailAccountMenuContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this._transaction = () => {
       // ** transaction sign ** 
      // let fromPrivateKeyBuffer = wallet.getPrivateKey();
      // const tx = new yeedTx(txData);
      // tx.sign(fromPrivateKeyBuffer);
      
      // let privateKey = fromPrivateKeyBuffer.toString('hex');
      // const yeedAccount = fromPrivateKey(toBuffer(`0x${privateKey}`));
      // const fromAddress = yeedAccount.getAddressString();

      // const txData = {
      //   chainId: 0x03,
      //   gasPrice: web3.utils.toHex(totalGasPrice),
      //   gasLimit: web3.utils.toHex(21000),
      //   to: toAddress,
      //   from: fromAddress,
      //   value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
      //   nonce: web3.utils.toHex(count)
      // };
      // const tx = new ethTx(txData);
      // tx.sign(fromPrivateKeyBuffer);
    }

  }

  render() {
    return <DetailAccountMenuPresenter {...this.props} {...this.state} 

          />;
  }
}

export default DetailAccountMenuContainer;
