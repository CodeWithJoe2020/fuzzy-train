import React from 'react';
import Head from 'next/head';
import { MessageCircle, Github, Mail, ExternalLink, Code, Youtube } from 'lucide-react';

const ContactCard = ({ Icon, title, content, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="block no-underline hover:no-underline"
  >
    <div className="shadow-lg mb-4 rounded-3xl overflow-hidden" style={{ backgroundColor: '#2c2f58' }}>
      <div className="flex items-center p-4">
        {/* Icon and Text column */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{ color: '#818394' }}>
            <Icon className="w-5 h-5" />
            {title}
          </h3>
          {content && (
            <p className="text-gray-400 text-sm mb-2">{content}</p>
          )}
        </div>
        {/* Button column */}
        <div className="flex-shrink-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
            View
            <ExternalLink className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </a>
);

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Contact</title>
        <meta content="contact" name="CWJ contact page" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-8 max-w-6xl mx-auto">
            <div className="flex-1 min-w-[300px]">
              <h1 className="text-4xl font-bold mb-4">CodeWithJoe</h1>
              <p className="text-xl text-gray-200">
                Revolutionizing Web3, smart contracts, and AI solutions
              </p>
            </div>
            <div>
              <button 
                onClick={() => window.open('https://codewithjoe.streamlit.app/', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center transition-colors duration-200"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat with CWJ-AI
              </button>
            </div>
          </div>
        </div>
      </div>

      

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-6">
          {/* Contact Cards */}
          <div id="contact" className="space-y-4">
            <ContactCard
              Icon={Code}
              title="Fiverr"
              content="Web3, bots, smart contracts, frontend magic"
              link="https://www.fiverr.com/codingjoe700"
            />
            <ContactCard
              Icon={MessageCircle}
              title="Telegram"
              content="Telegram VIP"
              link="https://t.me/codewithjoevip"
            />
            <ContactCard
              Icon={Mail}
              title="Email"
              content="codeingwithjoe@gmail.com"
              link="mailto:codeingwithjoe@gmail.com"
            />
            <ContactCard
              Icon={Github}
              title="GitHub"
              link="https://github.com/CodeWithJoe2020"
            />
          </div>

          {/* YouTube Section */}
          <div id="youtube" className="shadow-lg rounded-3xl overflow-hidden" style={{ backgroundColor: '#2c2f58' }}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#818394' }}>
                Join the Revolution
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to my YouTube channel for cutting-edge coding insights and tutorials.
              </p>
              <button
                onClick={() => window.open('https://www.youtube.com/@CodeWithJoe', '_blank')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Youtube className="mr-2 w-5 h-5" />
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;