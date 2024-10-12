import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CodeWithJoe</title>
        <meta content="Blockchain and Web3" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Image 
          src="/logo.png"
          width={300}
          height={300}
          alt="CodeWithJoe-Logo"
          className={styles.logo}
        />

        <p className={styles.description}>
          <code className={styles.code}>Web3 & Blockchain</code>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://rainbow.me"
          rel="noopener noreferrer"
          target="_blank"
          className={styles.footerLink}
        >
          Made with ❤️ by CodeWithJoe 💻
        </a>
      </footer>
    </div>
  );
};

export default Home;
