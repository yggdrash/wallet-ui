# Yggdrash Wallet
Yggdrash Wallet Desktop App for YEED Coin

## Download
[Latest Release]()


#### Homebrew
For Mac users the package is available in [Homebrew](https://brew.sh/):

```
brew update
brew install yarn
```

## Features
* Available on ***Windows***, ***Linux*** (Ubuntu/Debian) and ***MacOSX*** (signed).


## Build

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. Optionally switch to node 9.8.0, because this is currently developed with this version:
```
nvm install 9.8.0
nvm use
```

Install from source:
```bash
# Clone this repository
git clone git@bitbucket.org:r2v/yggdrash-wallet.git
# Go into the repository
cd yggdrash-wallet
# Install dependencies
yarn install
```

* In some cases, [node-hid](https://github.com/node-hid/node-hid) doesn't provide pre-built binaries, so is necessary to install the [node-hid dependencies](https://github.com/node-hid/node-hid#compiling-from-source) to build them from source before running `npm install`.

Then start:
```bash
yarn dev
```

### Requirements to build from OS X

```
brew tap Homebrew/bundle
brew bundle
```
