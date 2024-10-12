import React from 'react';
import { MessageCircle, Github, Mail, ExternalLink, Code, Youtube } from 'lucide-react';

const ContactItem = ({ Icon, title, content, link }) => (
  <div
    style={{
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '0.5rem',
      boxShadow:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      marginBottom: '1rem',
    }}
  >
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem',
      }}
    >
      <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
      {title}
    </h3>
    {content && (
      <p
        style={{
          fontSize: '0.875rem',
          color: '#4B5563',
          marginBottom: '0.5rem',
        }}
      >
        {content}
      </p>
    )}
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#3B82F6',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        View{' '}
        <ExternalLink
          style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }}
        />
      </a>
    )}
  </div>
);

export default function Contact() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F3F4F6',
      }}
    >
      {/* Header Section */}
      <div
        style={{
          backgroundColor: '#2C3E50',
          color: 'white',
          padding: '3rem 1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            maxWidth: '64rem',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div
            style={{
              flex: '1 1 300px',
            }}
          >
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              CodeWithJoe
            </h1>
            <p style={{ fontSize: '1.25rem' }}>
              Revolutionizing Web3, smart contracts, and AI solutions
            </p>
          </div>
          <div
            style={{
              flex: '0 1 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() =>
                window.open('https://codewithjoe.streamlit.app/', '_blank')
              }
              style={{
                backgroundColor: '#3498DB',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background-color 0.3s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = '#2980B9')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = '#3498DB')
              }
            >
              <MessageCircle
                style={{ marginRight: '0.5rem', width: '1rem', height: '1rem' }}
              />{' '}
              Chat with CWJ-AI
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '64rem',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <main
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem',
          }}
        >
          <div>
            <ContactItem
              Icon={Code}
              title="Fiverr"
              content="Web3, bots, smart contracts, frontend magic"
              link="https://www.fiverr.com/codingjoe700"
            />
            <ContactItem
              Icon={MessageCircle}
              title="Telegram"
              content="Telegram VIP"
              link="https://t.me/codewithjoevip"
            />
            <ContactItem
              Icon={Mail}
              title="Email"
              content="codeingwithjoe@gmail.com"
              link="mailto:codeingwithjoe@gmail.com"
            />
            <ContactItem
              Icon={Github}
              title="GitHub"
              link="https://github.com/CodeWithJoe2020"
            />
          </div>
          <div>
            <div
              style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow:
                  '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Join the Revolution
              </h2>
              <p
                style={{
                  color: '#4B5563',
                  marginBottom: '1rem',
                }}
              >
                Subscribe to my YouTube channel for cutting-edge coding insights
                and tutorials.
              </p>
              <button
                style={{
                  backgroundColor: '#E74C3C',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#C0392B')
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = '#E74C3C')
                }
                onClick={() =>
                  window.open('https://www.youtube.com/@CodeWithJoe', '_blank')
                }
              >
                <Youtube
                  style={{
                    marginRight: '0.5rem',
                    width: '1rem',
                    height: '1rem',
                  }}
                />{' '}
                Subscribe Now
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
