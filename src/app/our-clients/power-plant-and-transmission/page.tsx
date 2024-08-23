// pages/Building.tsx
"use client";
import { useState, useEffect } from 'react';
import axiosClient from '../../utils/axiosClient'; // Import instance axios yang telah dikonfigurasi
import Title from '../components/Title';

interface ProjectItem {
  id: number;
  image: string;
  title: string;
}

const Building: React.FC = () => {
  const [buildingData, setBuildingData] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const response = await axiosClient.get('/client/4'); // URL relatif
        setBuildingData(response.data.map((item: any) => ({
          id: parseInt(item.id),
          image: item.image,
          title: item.title
        })));
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
    <Title />
        <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 dark:text-gray-400">
          {loading && (
            <div className="col-span-full text-center text-gray-500">Loading...</div>
          )}
          {error && (
            <div className="col-span-full text-center text-red-500">{error}</div>
          )}
          {!loading && !error && buildingData.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No data available</div>
          )}
          {!loading && !error && buildingData.map(item => (
            <div key={item.id} className="flex items-center justify-center">
              <img
                src={`http://tech.jayacm.co.id:8081/jayacm/assets/img/uploads/${item.image}`}
                alt={item.title}
                className="w-50 h-24"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Building;
