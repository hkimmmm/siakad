import React from 'react';
const MainLayout = ({ children }) => (
  <div className="flex h-screen bg-blue-400">
    <h1>selamat datang</h1>
    <main className="flex-1 bg-gray-100 p-4 overflow-auto">{children}</main>
  </div>
);

export default MainLayout;
