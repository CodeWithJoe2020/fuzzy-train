import React, { useState, useEffect } from 'react';
import { useAccount, useBlockNumber } from 'wagmi';
import 'bootstrap/dist/css/bootstrap.css';

function Transactions() {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const [transactions, setTransactions] = useState([]);
  const [apiKey] = useState('NS8634IVYHDG7Q64U1UDXP9IABJ3ZGUX2I'); // Replace with your API key
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // Track the current page
  const pageSize = 10; // Number of transactions per page

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

  // Calculate total pages based on a static value of transactions
  // Assuming you want to infer total pages from the total records
  // This needs adjustment if you can fetch the total number of transactions
  const totalPages = Math.ceil(1000 / pageSize); // Adjust 1000 based on the actual number of transactions if known

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
    <div className="container-fluid py-4">
      <h3 className="mb-4 text-center">Transactions:</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover bg-dark text-light">
          <thead className="table-primary">
            <tr>
              <th>Hash</th>
              <th>Value (ETH)</th>
              <th>From</th>
              <th>To</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>
                    <a href={`https://etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer">
                      {transaction.hash.slice(0, 10)}...{transaction.hash.slice(-10)}
                    </a>
                  </td>
                  <td>{(transaction.value / 10 ** 18).toFixed(4)}</td>
                  <td>
                    <a href={`https://etherscan.io/address/${transaction.from}`} target="_blank" rel="noopener noreferrer">
                      {transaction.from.slice(0, 10)}...{transaction.from.slice(-10)}
                    </a>
                  </td>
                  <td>
                    <a href={`https://etherscan.io/address/${transaction.to}`} target="_blank" rel="noopener noreferrer">
                      {transaction.to.slice(0, 10)}...{transaction.to.slice(-10)}
                    </a>
                  </td>
                  <td>{formatTimestamp(transaction.timeStamp)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary mx-1"
          onClick={goToFirstPage}
          disabled={page === 1}
        >
          First Page
        </button>
        <button
          className="btn btn-outline-secondary mx-1"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          className="btn btn-outline-secondary mx-1"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next Page
        </button>
        <button
          className="btn btn-outline-secondary mx-1"
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
