const HDKey = require('hdkey')
const Wallet = require('./index.js')

function YggdrashHDKey () {
}

/*
 * Horrible wrapping.
 */
function fromHDKey (hdkey) {
  var ret = new YggdrashHDKey()
  ret._hdkey = hdkey
  return ret
}

YggdrashHDKey.fromMasterSeed = function (seedBuffer) {
  return fromHDKey(HDKey.fromMasterSeed(seedBuffer))
}

YggdrashHDKey.fromExtendedKey = function (base58key) {
  return fromHDKey(HDKey.fromExtendedKey(base58key))
}

YggdrashHDKey.prototype.privateExtendedKey = function () {
  if (!this._hdkey.privateExtendedKey) {
    throw new Error('This is a public key only wallet')
  }
  return this._hdkey.privateExtendedKey
}

YggdrashHDKey.prototype.publicExtendedKey = function () {
  return this._hdkey.publicExtendedKey
}

YggdrashHDKey.prototype.derivePath = function (path) {
  return fromHDKey(this._hdkey.derive(path))
}

YggdrashHDKey.prototype.deriveChild = function (index) {
  return fromHDKey(this._hdkey.deriveChild(index))
}

YggdrashHDKey.prototype.getWallet = function () {
  if (this._hdkey._privateKey) {
    return Wallet.fromPrivateKey(this._hdkey._privateKey)
  } else {
    return Wallet.fromPublicKey(this._hdkey._publicKey, true)
  }
}

module.exports = YggdrashHDKey
