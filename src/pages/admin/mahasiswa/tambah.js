import MainLayout from '@/components/admin/layouts/MainLayout';
import MahasiswaForm from '@/components/admin/forms/MahasiswaForm';

export default function TambahMahasiswa() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Tambah Mahasiswa</h1>
      <MahasiswaForm />
    </MainLayout>
  );
}
