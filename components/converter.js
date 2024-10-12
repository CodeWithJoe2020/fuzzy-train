import React, { useState } from 'react';
import { formatUnits, parseUnits } from 'ethers';
import 'bootstrap/dist/css/bootstrap.css';

function EthereumConverter() {
    const [amount, setAmount] = useState('1');
    const [fromUnit, setFromUnit] = useState('ether');
    const [toUnit, setToUnit] = useState('wei');
    const units = ['ether', 'wei', 'gwei', 'mwei', 'kwei', 'szabo', 'finney'];
  
    const handleAmountChange = (e) => {
      setAmount(e.target.value);
    };
  
    const handleFromUnitChange = (e) => {
      setFromUnit(e.target.value);
    };
  
    const handleToUnitChange = (e) => {
      setToUnit(e.target.value);
    };
  
    const convertAmount = () => {
      if (!amount || isNaN(amount)) {
        return 'Invalid input';
      }
      const amountInWei = parseUnits(amount.toString(), fromUnit);
      const convertedValue = formatUnits(amountInWei.toString(), toUnit);
      return convertedValue;
    };
  
    return (
        <div className="container py-5">
          <h1 className="text-center mb-5">Ethereum Unit Converter</h1>
          
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">Conversion Table</h3>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="thead-dark">
                        <tr>
                          <th>Denomination</th>
                          <th>Value in Ether</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Wei</td>
                          <td>1 Ether = 1,000,000,000,000,000,000 Wei</td>
                        </tr>
                        <tr>
                          <td>Kwei</td>
                          <td>1 Ether = 1,000,000,000,000,000 Kwei</td>
                        </tr>
                        <tr>
                          <td>Mwei</td>
                          <td>1 Ether = 1,000,000,000,000 Mwei</td>
                        </tr>
                        <tr>
                          <td>Gwei</td>
                          <td>1 Ether = 1,000,000,000 Gwei</td>
                        </tr>
                        <tr>
                          <td>Szabo</td>
                          <td>1 Ether = 1,000,000 Szabo</td>
                        </tr>
                        <tr>
                          <td>Finney</td>
                          <td>1 Ether = 1,000 Finney</td>
                        </tr>
                        <tr>
                          <td>Kether</td>
                          <td>1 Ether = 0.001 Kether</td>
                        </tr>
                        <tr>
                          <td>Mether</td>
                          <td>1 Ether = 0.000001 Mether</td>
                        </tr>
                        <tr>
                          <td>Gether</td>
                          <td>1 Ether = 0.000000001 Gether</td>
                        </tr>
                        <tr>
                          <td>Tether</td>
                          <td>1 Ether = 0.000000000001 Tether</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card shadow">
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">Converter</h3>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="fromUnit" className="form-label">From</label>
                      <select className="form-select" id="fromUnit" value={fromUnit} onChange={handleFromUnitChange}>
                        {units.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="toUnit" className="form-label">To</label>
                      <select className="form-select" id="toUnit" value={toUnit} onChange={handleToUnitChange}>
                        {units.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="alert alert-info mt-3" role="alert">
                    {amount} {fromUnit} is equal to <strong>{convertAmount()}</strong> {toUnit}.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5">
          </div>
        </div>
    );
}

export default EthereumConverter;