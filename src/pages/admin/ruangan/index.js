import React from 'react';
import Head from 'next/head';
import DaftarRuangan from '@/components/admin/screens/ruangan';

const ruangan = () => {
  return (
    <>
      <Head>
        <title>Ruangan</title>
      </Head>
      <DaftarRuangan />
    </>
  );
};

export default ruangan;
