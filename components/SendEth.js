import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { useState } from 'react';
import { parseEther } from 'ethers';

function SendEth() {
  const [toAddress, setToAddress] = useState('');
  const [transactionValue, setTransactionValue] = useState('1');
  const { config, error } = usePrepareSendTransaction({
    to: toAddress,
    value: parseEther(transactionValue || '0'),
  });
  const { sendTransaction } = useSendTransaction(config);

  const handleToAddressChange = (event) => {
    setToAddress(event.target.value);
  };

  const handleTransactionValueChange = (event) => {
    setTransactionValue(event.target.value);
  };

  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="0xA0Cf…251e || codewithjoe.eth"
            value={toAddress}
            onChange={handleToAddressChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-12">
          <input
            type="number"
            className="form-control"
            placeholder="Amount in ETH"
            value={transactionValue}
            onChange={handleTransactionValueChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-12">
          <button
            className="btn btn-primary w-100"
            disabled={!sendTransaction}
            onClick={() => sendTransaction?.()}
          >
            Send Native
          </button>
        </div>
      </div>
      {error && (
        <div className="row mt-2">
          <div className="col-md-12">
            <div className="alert alert-danger">
              An error occurred preparing the transaction: {error.message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SendEth;
