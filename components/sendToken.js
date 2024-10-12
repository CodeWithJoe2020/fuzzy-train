import React, { useState } from 'react';
import { usePrepareContractWrite, useContractWrite, useContractRead, useAccount } from 'wagmi';
import { parseUnits, formatUnits } from 'ethers';
import { erc20ABI } from 'wagmi';

function TokenTransfer() {
  const [contractAddress, setContractAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const { address: userAddress } = useAccount();

  const tokenNameData = useContractRead({
    address: contractAddress,
    abi: erc20ABI,
    functionName: 'name',
  });

  const tokenSymbolData = useContractRead({
    address: contractAddress,
    abi: erc20ABI,
    functionName: 'symbol',
  });

  const tokenTotalSupplyData = useContractRead({
    address: contractAddress,
    abi: erc20ABI,
    functionName: 'totalSupply',
  });

  const userBalanceData = useContractRead({
    address: contractAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [userAddress],
  });

  const tokenDecimal = useContractRead({
    address: contractAddress,
    abi: erc20ABI,
    functionName: 'decimals',
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [toAddress, amount ? parseUnits(amount, tokenDecimal.data || 18).toString() : '0'],
  });

  const { write: transferToken, data, isLoading, isSuccess, isError } = useContractWrite(config);

  const handleTransfer = () => {
    if (transferToken) {
      transferToken();
    } else {
      console.error('transferToken function is not available');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-3">
          <input 
            type="text" 
            value={contractAddress} 
            onChange={(e) => setContractAddress(e.target.value)} 
            placeholder="token contract address" 
            className="form-control"
          />
        </div>
        <div className="col-12 mb-3">
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="amount to transfer" 
            className="form-control"
          />
        </div>
        <div className="col-12 mb-3">
          <input 
            type="text" 
            value={toAddress} 
            onChange={(e) => setToAddress(e.target.value)} 
            placeholder="recipient address" 
            className="form-control"
          />
        </div>
      </div>

      {contractAddress && (
        <div className="row mb-3">
          <div className="col-12">
            <p><strong>Name:</strong> {tokenNameData.data}</p>
            <p><strong>Symbol:</strong> {tokenSymbolData.data}</p>
            <p>
              <strong>Total Supply:</strong> {tokenTotalSupplyData.data 
                ? formatUnits(tokenTotalSupplyData.data, tokenDecimal?.data || 18) 
                : 'Loading...'}
            </p>
            <p>
              <strong>Your Balance:</strong> {userBalanceData.data 
                ? parseFloat(formatUnits(userBalanceData.data, tokenDecimal?.data || 18)).toFixed(4) 
                : 'Loading...'}
            </p>

            {userBalanceData.data && tokenTotalSupplyData.data && (
              <p>
                <strong>You hold a percentage of:</strong> {
                  ((parseFloat(formatUnits(userBalanceData.data, tokenDecimal?.data || 18)) / 
                    parseFloat(formatUnits(tokenTotalSupplyData.data, tokenDecimal?.data || 18))) * 100).toFixed(7) + "%"
                }
              </p>
            )}
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <button 
            onClick={handleTransfer} 
            className="btn btn-primary w-100"
            disabled={!transferToken || isLoading}
          >
            {isLoading ? 'Transferring...' : 'Transfer Token'}
          </button>
        </div>
      </div>

      {isSuccess && <div className="alert alert-success mt-3">Transfer successful!</div>}
      {isError && <div className="alert alert-danger mt-3">Error occurred during transfer. Please try again.</div>}
    </div>
  );
}

export default TokenTransfer;
