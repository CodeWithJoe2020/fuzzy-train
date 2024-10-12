import React from 'react';
import { useBalance, useAccount } from 'wagmi';
import { useIsMounted } from '../components/useIsMounted';

function Balance({ ethereumPrice }) {
  const mounted = useIsMounted();
  const { address } = useAccount();

  const { data, isError, isLoading } = useBalance({
    address: address,
    watch: true
  });

  // Calculate the USD value
  const usdValue = ethereumPrice * (data?.formatted || 0);

  // Format the address
  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isLoading) return <div className="text-center">Fetching balance…</div>;
  if (isError) return <div className="text-center">Error fetching balance</div>;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4 mt-3" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}>
            {mounted ? address && (
              <p className="text-center mb-2"><strong>Address:</strong> {formatAddress(address)}</p>
            ) : null}
            {mounted ? data && (
              <p className="text-center mb-2">
                <strong>Balance:</strong> {parseFloat(data?.formatted).toFixed(6)} {data?.symbol}
              </p>
            ) : null}
            <p className="text-center"><strong>USD Value:</strong> ${usdValue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
