import React, { useState, useEffect } from 'react';
import { useAccount, useBlockNumber } from 'wagmi';

function Transactions() {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const [transactions, setTransactions] = useState([]);
  const [apiKey] = useState('8SA2G67AS44A8UFVTWVKVAM4B2GRTRTTUN');
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (!address || address.trim() === '') {
      setError('Please enter a valid Ethereum address.');
      setTransactions([]);
      return;
    }

    const startBlock = 0;
    const endBlock = blockNumber;

    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&offset=${pageSize}&page=${page}&sort=desc&apikey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === '1') {
          setTransactions(data.result);
          setError('');
        } else {
          setError('Failed to fetch data. Please check the address and try again.');
          setTransactions([]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred while fetching data.');
        setTransactions([]);
      });
  }, [address, apiKey, blockNumber, page]);

  const totalPages = Math.ceil(1000 / pageSize);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toDateString() + ' ' + date.toLocaleTimeString();
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);

  return (
    <div className="p-6 max-w-full">
      <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">Transactions</h3>
      
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hash</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value (ETH)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a 
                      href={`https://etherscan.io/tx/${transaction.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {transaction.hash.slice(0, 10)}...{transaction.hash.slice(-10)}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(transaction.value / 10 ** 18).toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a 
                      href={`https://etherscan.io/address/${transaction.from}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {transaction.from.slice(0, 10)}...{transaction.from.slice(-10)}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a 
                      href={`https://etherscan.io/address/${transaction.to}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {transaction.to.slice(0, 10)}...{transaction.to.slice(-10)}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatTimestamp(transaction.timeStamp)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {error && (
        <p className="mt-4 text-center text-red-600">{error}</p>
      )}
      
      <div className="mt-6 flex justify-center space-x-2">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goToFirstPage}
          disabled={page === 1}
        >
          First Page
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next Page
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goToLastPage}
          disabled={page === totalPages}
        >
          Last Page
        </button>
      </div>
    </div>
  );
}

export default Transactions;