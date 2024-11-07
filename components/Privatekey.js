import { useEffect, useState } from 'react';
import { Wallet } from 'ethers';
import { useAccount } from 'wagmi';

function WalletGenerator() {
  const [walletInfo, setWalletInfo] = useState(null);
  const { address } = useAccount();

  const generateWallet = () => {
    const wallet = Wallet.createRandom();

    const ethereumAddress = wallet.address;
    const privateKey = wallet.privateKey;
    const mnemonic = wallet.mnemonic.phrase;

    setWalletInfo({
      ethereumAddress,
      privateKey,
      mnemonic,
    });
  };

  // Use useEffect to handle client-side state changes
  useEffect(() => {
    if (walletInfo) {
      // This can be useful if you need to perform any side effects when walletInfo changes
    }
  }, [walletInfo]);

  return (
    <div className="container my-4">
      <div className="card mx-auto border-0" style={{ maxWidth: '600px' }}>
        <div className="card-body text-center">
          <h1 className="card-title mb-4">Ethereum Wallet Generator</h1>
          <button onClick={generateWallet} className="btn btn-primary btn-lg mb-4">
            Generate Wallet
          </button>
          {walletInfo && (
            <div className="text-left">
              <div className="mb-3">
                <strong>Ethereum Address:</strong>
                <p className="text-monospace bg-light p-2 rounded" style={{ wordBreak: 'break-all' }}>
                  {walletInfo.ethereumAddress}
                </p>
              </div>
              <div className="mb-3">
                <strong>Private Key:</strong>
                <p className="text-monospace bg-light p-2 rounded" style={{ wordBreak: 'break-all' }}>
                  {walletInfo.privateKey}
                </p>
              </div>
              <div className="mb-3">
                <strong>Mnemonic:</strong>
                <p className="text-monospace bg-light p-2 rounded" style={{ wordBreak: 'break-word' }}>
                  {walletInfo.mnemonic}
                </p>
              </div>
            </div>
          )}
          {address && <p>Connected Wallet Address: {address}</p>}
        </div>
      </div>
    </div>
  );
}

export default WalletGenerator;
