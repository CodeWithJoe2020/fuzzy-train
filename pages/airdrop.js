import React, { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { parseUnits } from 'viem';
import airdropABI from '../components/abi/airdropAbi.json';
import tokenABI from '../components/abi/erc20.json';

const CONTRACT_ADDRESS = "0x68E575f14Dc91AD1661779E4C47d479A164f3b4e";

const AirdropComponent = () => {
    const [tokenAddress, setTokenAddress] = useState('');
    const [recipients, setRecipients] = useState('');
    const [amounts, setAmounts] = useState('');
    const [fee, setFee] = useState('0.001');
    const [transactionHash, setTransactionHash] = useState(null);
  
    const parseAmounts = (recipientsArray, amountsInput) => {
      const amountsArray = amountsInput.split(',').map((amount) => amount.trim());
      if (amountsArray.length === 1 && recipientsArray.length > 1) {
        const totalAmount = parseUnits(amountsArray[0], 18);
        const individualAmount = BigInt(totalAmount) / BigInt(recipientsArray.length);
        return recipientsArray.map(() => individualAmount);
      } else {
        return amountsArray.map((amount) => parseUnits(amount, 18));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const recipientsArray = recipients.split(',').map((address) => address.trim());
      const amountsArray = parseAmounts(recipientsArray, amounts);
  
      const config = {
        address: CONTRACT_ADDRESS,
        abi: airdropABI,
        functionName: 'airdrop',
        args: [
          tokenAddress,
          recipientsArray,
          amountsArray,
        ],
        overrides: {
          value: parseUnits(fee, 18),
        },
      };
  
      try {
        const { writeAsync } = useContractWrite(config);
        const tx = await writeAsync?.();
        if (tx) {
          setTransactionHash(tx.hash);
        }
      } catch (error) {
        console.error('Transaction Error:', error);
      }
    };
  
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: transactionHash });
  
    return (
      <div className="airdrop-component">
        <h2>Airdrop Tokens</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Token Address</label>
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Recipients (comma separated addresses)</label>
            <input
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Amounts (comma separated values in tokens or total amount for equal distribution)</label>
            <input
              type="text"
              value={amounts}
              onChange={(e) => setAmounts(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Fee (in Ether)</label>
            <input
              type="text"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Airdropping...' : 'Airdrop Tokens'}
          </button>
        </form>
        {isSuccess && <p>Airdrop successful! Transaction Hash: {transactionHash}</p>}
      </div>
    );
  };
  
  export default AirdropComponent;