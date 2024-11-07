import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAccount, useContractWrite, useContractRead, useWaitForTransaction, useNetwork, useSwitchNetwork } from 'wagmi';
import { mainnet, base, sepolia } from 'wagmi/chains';

const ERC20FactoryAddresses = {
    [sepolia.id]: "0x5a1D4ccCCF3b47aa4f5616AA65a33a452439F661",
    [mainnet.id]: "0x7d5a0d914F9083F6C00F02Ba5b4dFEb16c14764d"
};

const ERC20FactoryABI = [
    {
        "inputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "symbol", "type": "string" },
            { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }
        ],
        "name": "deployToken",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDeployedTokens",
        "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "deployFee",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
];

const networks = [
    {
        name: 'Ethereum Mainnet',
        chainId: mainnet.id,
        disabled: false,
        icon: '🔷',
        blockExplorer: 'https://etherscan.io'
    },
    {
        name: 'Base',
        chainId: base.id,
        disabled: true,
        icon: '🔵',
        blockExplorer: 'https://basescan.org'
    },
    {
        name: 'Sepolia',
        chainId: sepolia.id,
        disabled: false,
        icon: '🟣',
        blockExplorer: 'https://sepolia.etherscan.io'
    }
];

export default function DeployToken() {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState('');
    const [deployedTokens, setDeployedTokens] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [error, setError] = useState('');
    
    const { chain } = useNetwork();
    const { switchNetwork, isLoading: isSwitchingNetwork, pendingChainId } = useSwitchNetwork();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Get the appropriate factory address based on the current network
    const factoryAddress = chain ? ERC20FactoryAddresses[chain.id] : null;

    // Read the deploy fee from the contract
    const { data: deployFee, isLoading: isLoadingFee } = useContractRead({
        address: factoryAddress,
        abi: ERC20FactoryABI,
        functionName: 'deployFee',
    });

    // Read the deployed tokens
    const { data: tokens, refetch: refetchTokens } = useContractRead({
        address: factoryAddress,
        abi: ERC20FactoryABI,
        functionName: 'getDeployedTokens',
    });

    useEffect(() => {
        if (tokens) {
            setDeployedTokens(tokens);
        }
    }, [tokens]);

    const { write: deployToken, data: deployData, isLoading: isDeploying, isError: isDeployError, error: deployError } = useContractWrite({
        address: factoryAddress,
        abi: ERC20FactoryABI,
        functionName: 'deployToken',
    });

    const { isLoading: isWaiting, isSuccess: isDeployComplete } = useWaitForTransaction({
        hash: deployData?.hash,
        confirmations: 1,
    });

    useEffect(() => {
        if (isDeployComplete) {
            refetchTokens();
            setTxHash(deployData?.hash || '');
        }
    }, [isDeployComplete, refetchTokens, deployData?.hash]);

    useEffect(() => {
        if (isDeployError && deployError) {
            setError(deployError.message || 'An error occurred during deployment');
        }
    }, [isDeployError, deployError]);

    const handleDeployToken = async () => {
        if (!name || !symbol || !totalSupply || !deployFee) {
            setError("Please fill all fields and ensure the deploy fee is loaded.");
            return;
        }

        setError('');
        setTxHash('');

        try {
            const totalSupplyBigInt = BigInt(totalSupply);
            
            await deployToken({
                args: [name, symbol, totalSupplyBigInt],
                value: deployFee,
            });
        } catch (error) {
            console.error("Token deployment failed:", error);
            setError("Token deployment failed. Please try again.");
        }
    };

    const getBlockExplorer = () => {
        const currentNetwork = networks.find(n => n.chainId === chain?.id);
        return currentNetwork?.blockExplorer || 'https://etherscan.io';
    };

    return (
        <div className="deploy-token">
            {isMounted && (
                <>
                    <Head>
                        <title>CreateToken</title>
                        <meta content="Create ERC20 token" name="Create ERC20 Token for any EVM with a few clicks" />
                        <link href="/favicon.ico" rel="icon" />
                    </Head>

                    <h2>Create ERC20 Token</h2>

                    <div className="network-selector">
                        <h3>Select Network</h3>
                        <div className="network-buttons">
                            {networks.map((network) => (
                                <button
                                    key={network.chainId}
                                    onClick={() => switchNetwork?.(network.chainId)}
                                    disabled={
                                        network.disabled ||
                                        isSwitchingNetwork ||
                                        chain?.id === network.chainId
                                    }
                                    className={`network-button ${
                                        chain?.id === network.chainId ? 'active' : ''
                                    } ${network.disabled ? 'disabled' : ''}`}
                                >
                                    <span>{network.icon}</span>
                                    <span>{network.name}</span>
                                    {isSwitchingNetwork && pendingChainId === network.chainId && (
                                        <span className="loading">Switching...</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        {chain && (
                            <p className="current-network">
                                Current Network: {chain.name}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Token Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter token name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="symbol">Token Symbol</label>
                        <input
                            id="symbol"
                            type="text"
                            placeholder="Enter token symbol"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="totalSupply">Total Supply (in tokens)</label>
                        <input
                            id="totalSupply"
                            type="number"
                            placeholder="Enter total supply"
                            value={totalSupply}
                            onChange={(e) => setTotalSupply(e.target.value)}
                        />
                        <p className="help-text">Enter the desired total supply. The contract will automatically handle the 18 decimal places.</p>
                    </div>

                    <div className="form-group">
                        <p><strong>Deployment Fee:</strong> 0.001</p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button 
                        onClick={handleDeployToken} 
                        disabled={
                            isDeploying || 
                            isWaiting || 
                            !isMounted || 
                            isLoadingFee || 
                            !factoryAddress
                        }
                        className="deploy-button"
                    >
                        {isDeploying || isWaiting ? "Deploying..." : "Deploy Token"}
                    </button>

                    {txHash && (
                        <div className="success-message">
                            Token deployed successfully!
                            <br />
                            Transaction Hash:
                            <a 
                                href={`${getBlockExplorer()}/tx/${txHash}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {txHash}
                            </a>
                        </div>
                    )}

                    <h3>Recently Deployed Tokens</h3>
                    <ul className="deployed-tokens">
                        {deployedTokens.length > 0 ? (
                            deployedTokens.map((tokenAddress, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={`${getBlockExplorer()}/address/${tokenAddress}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        {tokenAddress}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <p>No tokens deployed yet.</p>
                        )}
                    </ul>
                </>
            )}

            
<style jsx>{`
                .deploy-token {
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    max-width: 600px;
                    margin: auto;
                }

                h2, h3 {
                    text-align: center;
                    margin-bottom: 20px;
                }

                .network-selector {
                    margin-bottom: 30px;
                    text-align: center;
                }

                .network-buttons {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 15px;
                }

                .network-button {
                    padding: 10px 20px;
                    border-radius: 8px;
                    border: 2px solid #ddd;
                    background: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s;
                }

                .network-button:not(.disabled):hover {
                    border-color: #007bff;
                }

                .network-button.active {
                    border-color: #28a745;
                    background: #e8f5e9;
                }

                .network-button.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    background: #f5f5f5;
                }

                .current-network {
                    font-size: 14px;
                    color: #666;
                    margin-top: 10px;
                }

                .loading {
                    font-size: 12px;
                    color: #666;
                }

                .form-group {
                    margin-bottom: 15px;
                }

                label {
                    display: block;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                input {
                    width: 100%;
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }

                .help-text {
                    font-size: 14px;
                    color: #666;
                    margin-top: 5px;
                }

                .deploy-button {
                    width: 100%;
                    padding: 10px;
                    background-color: #28a745;
                    color: white;
                    font-size: 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .deploy-button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .deployed-tokens {
                    list-style: none;
                    padding: 0;
                }

                .deployed-tokens li {
                    text-align: center;
                    margin: 5px 0;
                    word-break: break-all;
                }

                a {
                    color: #007bff;
                    text-decoration: none;
                }

                a:hover {
                    text-decoration: underline;
                }

                .error-message {
                    color: #dc3545;
                    margin-bottom: 15px;
                    text-align: center;
                }

                .success-message {
                    color: #28a745;
                    margin-top: 15px;
                    text-align: center;
                    word-break: break-all;
                }
            `}</style>
        </div>
    );
}
