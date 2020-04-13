import React from 'react';

function Footer() {
  return (
    <div>
      <a
        href="http://brandnpatterson.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        &copy; {new Date().getFullYear()} Brandon Patterson
      </a>
    </div>
  );
}

export default Footer;
