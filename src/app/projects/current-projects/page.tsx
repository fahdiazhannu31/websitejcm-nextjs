"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosClient from '../../utils/axiosClient'; // Import axiosClient

interface ProjectItem {
  id: number;
  image: string;
  name: string;
  description: string;
  location?: string;
  periode?: string;
  employer?: string;
  total_area?: string;
  size?: string;
}

const itemsPerPage = 4;

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 animate-pulse">
        <div className="h-48 bg-gray-300 rounded-t-lg"></div>
        <div className="p-5">
          <div className="h-6 bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 mb-2 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Building');
  const [data, setData] = useState<Record<string, ProjectItem[]>>({
    Building: [],
    Industries: [],
    Transportation: [],
    Powerplant: []
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const categoryIdMap: Record<string, number> = {
          Building: 1,
          Industries: 2,
          Transportation: 3,
          Powerplant: 4
        };
        const response = await axiosClient.get(`/projectById/${categoryIdMap[activeTab]}`);
        const formattedData = response.data.map((item: any) => ({
          id: parseInt(item.id),
          image: item.image,
          name: item.name,
          description: item.description,
          location: item.location,
          periode: item.periode,
          employer: item.employer,
          total_area: item.total_area,
          size: item.size
        }));
        setData(prevData => ({ ...prevData, [activeTab]: formattedData }));
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const getPaginatedData = (): ProjectItem[] => {
    const dataForTab = data[activeTab] || [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return dataForTab.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil((data[activeTab]?.length || 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {['Building', 'Industries', 'Transportation', 'Powerplant'].map(category => (
            <li key={category} className="me-2">
              <Link href="#">
                <span
                  className={`inline-block p-4 border-b-2 ${activeTab === category ? 'text-red-600 border-red-600' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer`}
                  onClick={() => {
                    setActiveTab(category);
                    setCurrentPage(1); // Reset to the first page on tab change
                  }}
                >
                  {category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        {loading && <SkeletonLoader />}
        {error && <p className="text-red-500">{error}</p>}
        {(!loading && !error) && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getPaginatedData().length === 0 ? (
                <p>No data available</p>
              ) : (
                getPaginatedData().map(item => (
                  <div key={item.id} className="bg-white shadow-md rounded-tl-2xl rounded-br-2xl overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <a href="#">
                      <img className="w-full h-48 object-cover" src={`http://tech.jayacm.co.id:8081/jayacm/assets/img/uploads/${item.image}`} alt={item.name} />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Location: {item.location}</p>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Periode: {item.periode}</p>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Employer: {item.employer}</p>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Capacity: {item.total_area}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 red__jcm text-white rounded-l-lg"
              >
                Prev
              </button>
              <span className="px-4 py-2">{` ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 red__jcm text-white rounded-r-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
