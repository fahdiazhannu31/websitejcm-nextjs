"use client";
import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient'; // Sesuaikan path ini dengan struktur project kamu
import Image from 'next/image'; // Gunakan next/image untuk optimasi gambar
import Link from 'next/link';

// Komponen Loader Sementara
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-300 mb-4 rounded"></div>
    <div className="h-4 bg-gray-300 mb-2 rounded"></div>
    <div className="h-4 bg-gray-300 mb-2 rounded"></div>
    <div className="h-4 bg-gray-300 mb-2 rounded"></div>
  </div>
);

interface Career {
  id: string;
  image: string;
  position: string;
  education: string;
  slug: string;
  experience: string;
  qualification: string;
  job_description: string;
}

export default function CareerPage() {
  const [careerData, setCareerData] = useState<Career[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/career');
        const data = response.data;

        // Pastikan data adalah array
        if (Array.isArray(data)) {
          setCareerData(data);
        } else {
          setError('Unexpected API response format.');
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      {loading && <SkeletonLoader />}
      {error && <p className="text-red-800">{error}</p>}
      {!loading && !error && Array.isArray(careerData) && careerData.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {careerData.map((career) => (
            <div key={career.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 ease-in-out hover:scale-105">
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-800 dark:text-white">{career.position}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <strong>Min.</strong> {career.education}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-10">
                  <strong>Exp.</strong> {career.experience}
                </p>
                <Link href={`/career/detail/${career.slug}`} className="bg-red-800 text-white rounded-md py-2 px-5 inline-block hover:bg-red-900">Detail</Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && Array.isArray(careerData) && careerData.length === 0 && (
        <p className="text-gray-500">No careers found.</p>
      )}
    </div>
  );
}
