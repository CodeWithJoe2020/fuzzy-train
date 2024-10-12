import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Login() {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
      <div className="row align-items-center">
          <div className="col-8">
            <h4>Welcome to CodeWithJoe</h4>
            <p className="lead">Connect to your crypto wallet to access your account.💰</p>
          </div>
          <div className="col-4">
            <Image src="/logo.png" width="200" height="200" alt="logo" className="display-4"></Image>
          </div>
        </div>
        <p>We support Metamask, Trust wallet, Wallet Connect etc...</p>
      </div>
    </div>
  );
}

export default Login;
