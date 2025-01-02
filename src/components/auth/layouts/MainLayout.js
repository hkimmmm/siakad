import React from 'react';

const MainLayout = ({ children }) => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ backgroundColor: '#00FF00' }}
  >
    {children}
  </div>
);

export default MainLayout;
