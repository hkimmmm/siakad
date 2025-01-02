import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-4 text-gray-600">
          Selamat datang di halaman dashboard admin.
        </p>
        {/* Tambahkan konten dashboard di bawah ini */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Users
              </h2>
              <p className="mt-2 text-gray-600">120</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Posts
              </h2>
              <p className="mt-2 text-gray-600">45</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold text-gray-800">
                Active Sessions
              </h2>
              <p className="mt-2 text-gray-600">8</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
