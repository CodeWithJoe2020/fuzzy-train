import React from 'react';
import Image from 'next/image';

const AdBanner = () => {
  return (
    <div style={styles.bannerContainer}>
      <a href="https://stake.com/?c=9BAmdcIb" target="_blank" rel="noopener noreferrer">
        <Image 
          src="/Stake_Casino_728x90(1).gif"  // Remove /public
          alt="stake" 
          width={728} 
          height={90} 
          style={styles.bannerImage} 
        />
      </a>
    </div>
  );
};

const styles = {
  bannerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
  },
  bannerImage: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default AdBanner;
