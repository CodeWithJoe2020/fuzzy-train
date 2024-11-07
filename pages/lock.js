import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useBalance,
  useWaitForTransaction,
} from 'wagmi';
import { parseEther, formatEther } from 'viem';
import styles from '../styles/Timelock.module.css';

// Replace with your deployed contract address
const contractAddress = '0x7551e3677e82cF352241D0FFcB5Fb77D377A4117';

// Contract ABI placeholder
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			}
		],
		"name": "AddressEmptyCode",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AddressInsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "FailedInnerCall",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "SafeERC20FailedOperation",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lockupId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "unlockTime",
				"type": "uint256"
			}
		],
		"name": "Locked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lockupId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "unlockTime",
				"type": "uint256"
			}
		],
		"name": "lockEther",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "unlockTime",
				"type": "uint256"
			}
		],
		"name": "lockToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "lockupId",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "lockupId",
				"type": "uint256"
			}
		],
		"name": "getLockup",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "unlockTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "withdrawn",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lockupCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lockups",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "unlockTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "withdrawn",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default function TimelockVaultInterface() {
  const [isMounted, setIsMounted] = useState(false);
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [unlockTime, setUnlockTime] = useState('');
  const [lockupId, setLockupId] = useState('');
  const [totalLocked, setTotalLocked] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { address } = useAccount();

  const { data: lockupCount } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'lockupCount',
    enabled: isMounted,
    watch: true,
  });

  const { data: lockupInfo } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getLockup',
    args: [BigInt(lockupId || 0)],
    enabled: isMounted,
    watch: true,
  });

  const { data: ethBalanceData } = useBalance({
    address: contractAddress,
    enabled: isMounted,
    watch: true,
    onSuccess: (data) => setTotalLocked(data?.value),
  });

  const { write: lockEther, data: lockEtherData } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'lockEther',
    onMutate: () => setIsLoading(true),
  });

  useWaitForTransaction({
    hash: lockEtherData?.hash,
    confirmations: 1,
    onSuccess: () => {
      setIsLoading(false);
      setSuccessMessage('Ether locked successfully!');
      setTransactionHash(lockEtherData?.hash);
    },
  });

  const { write: lockToken, data: lockTokenData } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'lockToken',
    onMutate: () => setIsLoading(true),
  });

  useWaitForTransaction({
    hash: lockTokenData?.hash,
    confirmations: 1,
    onSuccess: () => {
      setIsLoading(false);
      setSuccessMessage('Token locked successfully!');
      setTransactionHash(lockTokenData?.hash);
    },
  });

  const { write: withdraw, data: withdrawData } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'withdraw',
    onMutate: () => setIsLoading(true),
  });

  useWaitForTransaction({
    hash: withdrawData?.hash,
    confirmations: 1,
    onSuccess: () => {
      setIsLoading(false);
      setSuccessMessage('Withdrawal successful!');
      setTransactionHash(withdrawData?.hash);
    },
  });

  const handleLockEther = () => {
    if (!ethAmount || !unlockTime) return;
    const unixTime = Math.floor(new Date(unlockTime).getTime() / 1000);
    lockEther({ args: [BigInt(unixTime)], value: parseEther(ethAmount) });
  };

  const handleLockToken = () => {
    if (!tokenAddress || !tokenAmount || !unlockTime) return;
    const unixTime = Math.floor(new Date(unlockTime).getTime() / 1000);
    lockToken({ args: [tokenAddress, BigInt(tokenAmount), BigInt(unixTime)] });
  };

  const handleWithdraw = () => {
    if (!lockupId) return;
    withdraw({ args: [BigInt(lockupId)] });
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage('');
    setTransactionHash(null);
  };

  const shortenHash = (hash) => {
    return hash ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : '';
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.timelockInterface}>
		 <Head>
        <title>SmartLock</title>
        <meta content="smart lock" name="Lock up ethereum and ERC20 Token" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <h1 className={styles.heading1}>TimelockVault Interface</h1>

      <div className={styles.marginBottom4}>
        <h2 className={styles.heading2}>Total Locked ETH</h2>
        <p>{totalLocked ? formatEther(totalLocked) : 'Loading...'} ETH</p>
      </div>
      {isLoading && <div className={styles.alertLoading}>Transaction in progress...</div>}
      {successMessage && (
        <div className={styles.alertSuccess}>
          {successMessage}
          {transactionHash && (
            <p>
              Transaction Hash: <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">{shortenHash(transactionHash)}</a>
            </p>
          )}
          <button onClick={handleCloseSuccessMessage} className={styles.button}>Close</button>
        </div>
      )}
      
      <div className={styles.marginBottom4}>
        <h2 className={styles.heading2}>Lock Ether</h2>
        <input
          type="text"
          placeholder="ETH Amount"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="datetime-local"
          value={unlockTime}
          onChange={(e) => setUnlockTime(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={handleLockEther} className={`${styles.button} bg-blue-500`} disabled={isLoading}>
          Lock ETH
        </button>
      </div>

      <div className={styles.marginBottom4}>
        <h2 className={styles.heading2}>Lock Token</h2>
        <input
          type="text"
          placeholder="Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Token Amount"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="datetime-local"
          value={unlockTime}
          onChange={(e) => setUnlockTime(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={handleLockToken} className={`${styles.button} bg-green-500`} disabled={isLoading}>
          Lock Token
        </button>
      </div>

      <div className={styles.marginBottom4}>
        <h2 className={styles.heading2}>Withdraw</h2>
        <input
          type="number"
          placeholder="Lockup ID"
          value={lockupId}
          onChange={(e) => setLockupId(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={handleWithdraw} className={`${styles.button} bg-red-500`} disabled={isLoading}>
          Withdraw
        </button>
      </div>

      <div className={styles.marginBottom4}>
        <h2 className={styles.heading2}>Lockup Info</h2>
        {lockupInfo && (
          <div>
            <p className={styles.paragraph}>Amount: {formatEther(lockupInfo[0])} ETH</p>
            <p className={styles.paragraph}>Unlock Time: {new Date(Number(lockupInfo[1]) * 1000).toLocaleString()}</p>
            <p className={styles.paragraph}>Token Address: {lockupInfo[2]}</p>
            <p className={styles.paragraph}>Withdrawn: {lockupInfo[3] ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>

     

      <p className={styles.marginBottom4}>Total Lockups: {lockupCount?.toString() || '0'}</p>
    </div>
  );
}