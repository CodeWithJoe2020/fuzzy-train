import React from 'react';

const GitHubGistEmbed = ({ gistScripts }) => {
  return (
    <div>
      {gistScripts.map((script, index) => (
        <div
          key={index}
          dangerouslySetInnerHTML={{
            __html: script,
          }}
        />
      ))}
    </div>
  );
};

export default GitHubGistEmbed;
