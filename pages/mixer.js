import Head from 'next/head';
import TornadoCash from '../components/tornado';
import AdBanner from '../components/stake728';

export default function Home() {
  return (
    <div style={styles.container}>
      <Head>
        <title>Mixer</title>
        <meta content="ERC20 Mixer" name="Mix your ERC20 token" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <AdBanner />
      <TornadoCash />

      <div style={styles.contentContainer}>
        <h4 style={styles.heading}>Bitcoin Mixer</h4>
        <div style={styles.cardContainer}>
          <a href="https://wasabiwallet.io/" target="_blank" rel="noopener noreferrer" style={styles.card}>
            WasabiWallet
          </a>
          <a href="https://coinjoin.cash/" target="_blank" rel="noopener noreferrer" style={styles.card}>
            coinjoin.cash
          </a>
        </div>
        <br></br>
        <p style={{ color: 'white' }}>
        🛡 Use <a href="https://www.gate.io/ref/AVYQBW1W?ref_type=102" target="_blank" rel="noopener noreferrer">Monero</a> for privacy
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#242528',
  },
  contentContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  heading: {
    color: '#fff',
    fontSize: '24px',
    marginBottom: '20px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  card: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
    width: '150px',
  },
  cardHover: {
    backgroundColor: '#555',
  },
};
