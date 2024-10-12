// components/Sidebar.js
import React, { useState } from 'react';
import Link from 'next/link'; // Import the Link component
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  background-color: #333;
  color: #fff;
  transition: width 0.3s;
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <ul>
        <li>
          <Link href="/">
            ome
          </Link>
        </li>
        <li>
          <Link href="/wallet">
            Wallet
          </Link>
        </li>
        <li>
          <Link href="/contact">
            Contact
          </Link>
        </li>
      </ul>
      {/* Other Sidebar content goes here */}
    </SidebarContainer>
  );
}

export default Sidebar;
