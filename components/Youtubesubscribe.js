import React, { useEffect } from 'react';

const YouTubeSubscribeButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;

    script.onload = () => {
      // Render the YouTube Subscribe button once the script is loaded
      if (window.gapi) {
        window.gapi.ytsubscribe.render(
          document.querySelector('.g-ytsubscribe'),
          {
            channelid: 'UCdgU4pljNproO0RQVbT5QKg',
            layout: 'full',
            count: 'default',
          }
        );
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="g-ytsubscribe" data-channelid="UCdgU4pljNproO0RQVbT5QKg" data-layout="full" data-count="default"></div>
  );
};

export default YouTubeSubscribeButton;
