import React from 'react';
import Head from 'next/head';
import DaftarJadwal from '@/components/admin/screens/jadwal';
const Jadwal = () => {
  return (
    <>
      <Head>
        <title>Daftar Jadwal</title>
      </Head>
      <DaftarJadwal />
    </>
  );
};

export default Jadwal;
