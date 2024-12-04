export default function handler(req, res) {
  const mahasiswa = [
    {
      nim: '123456',
      nama_mahasiswa: 'John Doe',
      kode_prodi: 'TI',
      id_kelas: 'TI1A', // Updated class name
      tahun_masuk: 2023,
      semester: 3,
      gambar: 'path/to/john_doe.jpg',
      email: 'john.doe@example.com',
      no_telepon: '081234567890',
      alamat: 'Jl. Raya No. 1, Kota A',
      status: 'Aktif'
    },
    {
      nim: '654321',
      nama_mahasiswa: 'Jane Smith',
      kode_prodi: 'SI',
      id_kelas: 'TI1B', // Updated class name
      tahun_masuk: 2022,
      semester: 5,
      gambar: 'path/to/jane_smith.jpg',
      email: 'jane.smith@example.com',
      no_telepon: '082345678901',
      alamat: 'Jl. Merdeka No. 2, Kota B',
      status: 'Aktif'
    },
    {
      nim: '789012',
      nama_mahasiswa: 'Robert Brown',
      kode_prodi: 'TM',
      id_kelas: 'TM1A', // Updated class name
      tahun_masuk: 2021,
      semester: 7,
      gambar: 'path/to/robert_brown.jpg',
      email: 'robert.brown@example.com',
      no_telepon: '083456789012',
      alamat: 'Jl. Pemuda No. 3, Kota C',
      status: 'Akitf'
    }
  ];

  res.status(200).json(mahasiswa);
}
