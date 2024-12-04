import React, { useState } from 'react';
import Link from 'next/link';
import { MdDashboard } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { FaDatabase } from 'react-icons/fa';
import { FaUserGraduate, FaUserShield, FaUserTag } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { IoCalendarOutline } from 'react-icons/io5';
import { BiMessageDetail } from 'react-icons/bi';
import { MdOutlineClass } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';

const Sidebar = () => {
  const [isDataMasterOpen, setDataMasterOpen] = useState(false);
  const [isDataUserOpen, setDataUserOpen] = useState(false);
  const [isCurriculumOpen, setCurriculumOpen] = useState(false);
  const [isScheduleOpen, setScheduleOpen] = useState(false);
  const [isAbsenceOpen, setAbsenceOpen] = useState(false);
  const [isGradesOpen, setGradesOpen] = useState(false);
  const [isAnnouncementsOpen, setAnnouncementsOpen] = useState(false);
  const [isMaterialsOpen, setMaterialsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <aside className="w-64 h-screen bg-white text-gray-700 p-4 shadow-md overflow-y-auto flex flex-col">
      <div className="md:mt-2 mb-4 text-center">
        <Link href="/admin" className="text-2xl text-blue-500 font-bold">
          Admin
        </Link>
      </div>
      <nav className="md:mt-4 flex flex-col flex-grow space-y-2">
        <Link
          href="/admin/dashboard"
          className="flex items-center p-2 rounded-2xl hover:bg-blue-300 transition"
        >
          <MdDashboard className="mr-2" />
          Dashboard
        </Link>

        <div>
          <button
            className="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-blue-300 transition"
            onClick={() => setDataUserOpen(!isDataUserOpen)}
          >
            <span className="flex items-center">
              <FaDatabase className="mr-2" />
              Data Master
            </span>
          </button>
          {isDataUserOpen && (
            <div className="ml-4 space-y-1">
              <Link
                href="/admin/prodi"
                className="flex items-center p-2 hover:bg-blue-200 rounded"
              >
                <FaUserGraduate className="mr-2 h-5 w-5 text-blue-600" />
                Data Prodi
              </Link>
              <Link
                href="/admin/akademik"
                className="flex items-center p-2 hover:bg-blue-200 rounded"
              >
                <FaUserGraduate className="mr-2 h-5 w-5 text-blue-600" />
                Data Akademik
              </Link>
              <Link
                href="/admin/kelas"
                className="flex items-center p-2 hover:bg-blue-200 rounded"
              >
                <FaUserShield className="mr-2 h-5 w-5 text-blue-600" /> Data
                Kelas
              </Link>
              <Link
                href="/admin/ruangan"
                className="flex items-center p-2 hover:bg-blue-200 rounded"
              >
                <FaUserTag className="mr-2 h-5 w-5 text-blue-600" />
                Data Ruangan
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            className="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-blue-300 transition"
            onClick={() => setDataMasterOpen(!isDataMasterOpen)}
          >
            <span className="flex items-center">
              <FaDatabase className="mr-2" />
              Data Pengguna
            </span>
          </button>
          {isDataMasterOpen && (
            <div className="ml-4 space-y-1">
              <Link
                href="/admin/mahasiswa"
                className="flex items-center p-2 hover:bg-blue-200 rounded"
              >
                <FaUserGraduate className="mr-2 h-5 w-5 text-blue-600" /> Daftar
                Mahasiswa
              </Link>
              <Link
                href="/admin/dosen"
                className="flex items-center p-2 hover:bg-blue-200 rounded"
              >
                <FaUserGraduate className="mr-2 h-5 w-5 text-blue-600" /> Dosen
              </Link>
              <Link
                href="/admin/admins"
                className="flex items-center p-2 hover:bg-blue-200 rounded"
              >
                <FaUserShield className="mr-2 h-5 w-5 text-blue-600" /> Daftar
                Admin
              </Link>
              <Link
                href="/admin/role"
                className="flex items-center p-2 hover:bg-blue-200 rounded"
              >
                <FaUserTag className="mr-2 h-5 w-5 text-blue-600" /> Daftar Role
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            className="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-blue-300 transition"
            onClick={() => setCurriculumOpen(!isCurriculumOpen)}
          >
            <span className="flex items-center">
              <MdOutlineClass className="mr-2" />
              Kurikulum
            </span>
          </button>
          {isCurriculumOpen && (
            <div className="ml-4 space-y-1">
              <Link
                href="/admin/kurikulum"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Daftar Kurikulum
              </Link>
              <Link
                href="/admin/curriculum/add"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Tambah Kurikulum
              </Link>
              <Link
                href="/admin/curriculum/edit"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Edit Kurikulum
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            className="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-blue-300 transition"
            onClick={() => setScheduleOpen(!isScheduleOpen)}
          >
            <span className="flex items-center">
              <IoCalendarOutline className="mr-2" />
              Jadwal Kuliah
            </span>
          </button>
          {isScheduleOpen && (
            <div className="ml-4 space-y-1">
              <Link
                href="/admin/schedule"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Lihat Jadwal
              </Link>
              <Link
                href="/admin/schedule/add"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Tambah Jadwal
              </Link>
              <Link
                href="/admin/schedule/edit"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Edit Jadwal
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            className="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-blue-300 transition"
            onClick={() => setAbsenceOpen(!isAbsenceOpen)}
          >
            <span className="flex items-center">
              <IoStatsChart className="mr-2" />
              Absensi
            </span>
          </button>
          {isAbsenceOpen && (
            <div className="ml-4 space-y-1">
              <Link
                href="/admin/absensi/rekap"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Rekap Absensi
              </Link>
              <Link
                href="/admin/absensi/input"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Input Absensi
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            className="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-blue-300 transition"
            onClick={() => setGradesOpen(!isGradesOpen)}
          >
            <span className="flex items-center">
              <IoStatsChart className="mr-2" />
              Nilai
            </span>
          </button>
          {isGradesOpen && (
            <div className="ml-4 space-y-1">
              <Link
                href="/admin/grades/input"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Input Nilai
              </Link>
              <Link
                href="/admin/grades/view"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Lihat Nilai
              </Link>
              <Link
                href="/admin/grades/rekap"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Rekap Nilai
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            className="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-blue-300 transition"
            onClick={() => setAnnouncementsOpen(!isAnnouncementsOpen)}
          >
            <span className="flex items-center">
              <BiMessageDetail className="mr-2" />
              Pengumuman
            </span>
          </button>
          {isAnnouncementsOpen && (
            <div className="ml-4 space-y-1">
              <Link
                href="/admin/announcements"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Daftar Pengumuman
              </Link>
              <Link
                href="/admin/announcements/add"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Tambah Pengumuman
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            className="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-blue-300 transition"
            onClick={() => setMaterialsOpen(!isMaterialsOpen)}
          >
            <span className="flex items-center">
              <GiNotebook className="mr-2" />
              Bahan Ajar
            </span>
          </button>
          {isMaterialsOpen && (
            <div className="ml-4 space-y-1">
              <Link
                href="/admin/materials/upload"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Upload Materi
              </Link>
              <Link
                href="/admin/materials/view"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Lihat Materi
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            className="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-blue-300 transition"
            onClick={() => setProfileOpen(!isProfileOpen)}
          >
            <span className="flex items-center">
              <FaRegUser className="mr-2" />
              Profile
            </span>
          </button>
          {isProfileOpen && (
            <div className="ml-4 space-y-1">
              <Link
                href="/admin/profile"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Profil Pengguna
              </Link>
              <Link
                href="/admin/profile/change-password"
                className="block p-2 hover:bg-blue-200 rounded"
              >
                Ubah Password
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
