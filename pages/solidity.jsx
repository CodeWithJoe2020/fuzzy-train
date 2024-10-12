import React from 'react';
import GitHubGistEmbed from '../components/GithubGist';


function App() {
  const gistScript = ['<script src="https://gist.github.com/CodeWithJoe2020/2ed11f0ee3dc57b42e4af15b8dba02f5.js"></script>',
                    '<script src="https://gist.github.com/CodeWithJoe2020/f225be2a3144c6b51f2bc9142c858523.js"></script>',
                    '<script src="https://gist.github.com/CodeWithJoe2020/285b6963289e92dd8891ddc8f27bb159.js"></script>',
                    '<script src="https://gist.github.com/CodeWithJoe2020/9c140df7c13453fd690d28614c18d0c9.js"></script>'
                ]

  return (
    
    <div className="container mb-4 mt-4" >
        
      <GitHubGistEmbed gistScripts={gistScript} />
    </div>
    
  );
}

export default App;

