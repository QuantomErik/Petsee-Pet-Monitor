// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center text-xs p-3 absolute bottom-0 w-full border-t">
      © {new Date().getFullYear()} Petsee. All rights reserved.
    </footer>
  );
};

export default Footer;
