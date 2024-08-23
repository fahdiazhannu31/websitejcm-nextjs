"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import axiosClient from '../../utils/axiosClient'; // Import axiosClient from configuration file
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaRulerCombined,FaArrowRight } from 'react-icons/fa';


interface Category {
    id: string;
    name: string;
}

interface Experience {
    id: number;
    name: string;
    image: string;
    employer: string;
    periode: string;
    location: string;
    total_area: number;
    description: string;
}

const SkeletonCard = () => (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 animate-pulse">
        <div className="h-48 bg-gray-300 rounded-t-lg"></div>
        <div className="p-5">
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 bg-gray-300 rounded mb-3"></div>
        </div>
    </div>
);

export default function Powerplant() {
    const [activeTab, setActiveTab] = useState<string>('9');
    const [categories, setCategories] = useState<Category[]>([]);
    const [allExperiences, setAllExperiences] = useState<Experience[]>([]);
    const [paginatedExperiences, setPaginatedExperiences] = useState<Experience[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(4);
    const [loading, setLoading] = useState<boolean>(false);
    const [experience, setExperience] = useState<Experience[]>([]);

    useEffect(() => {
        // Fetch categories
        axiosClient.get('/categoryByGroup/4')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const fetchExperiences = useCallback(() => {
        if (activeTab !== 'project-list') {
            setLoading(true);
            axiosClient.get(`/experienceByCategory/${activeTab}`)
                .then(response => {
                    setAllExperiences(response.data || []);
                    setCurrentPage(1);
                })
                .catch(error => console.error('Error fetching experiences:', error))
                .finally(() => setLoading(false));
        }
    }, [activeTab]);

    const fetchProjects = useCallback(() => {
        if (activeTab === 'project-list') {
            setLoading(true);
            axiosClient.get('http://tech.jayacm.co.id:8081/jayacm/jayacm/api/experienceListByGroup/4')
                .then(response => setExperience(response.data || []))
                .catch(error => console.error('Error fetching projects:', error))
                .finally(() => setLoading(false));
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'project-list') {
            fetchProjects();
        } else {
            fetchExperiences();
        }
    }, [activeTab, fetchExperiences, fetchProjects]);

    useEffect(() => {
        // Update paginated experiences when currentPage or allExperiences changes
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedExperiences(allExperiences.slice(startIndex, endIndex));
    }, [currentPage, allExperiences, itemsPerPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= Math.ceil(allExperiences.length / itemsPerPage)) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <div className="container mx-auto mt-10 px-4">
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                        {categories.map((category) => (
                            <li key={category.id} className="me-2">
                                <Link
                                    href="#"
                                    className={`inline-block p-4 border-b-2 ${activeTab === category.id ? 'text-red-600 border-red-600' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer`}
                                    onClick={() => setActiveTab(category.id)}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                        <li className="me-2">
                            <Link
                                href="#"
                                className={`inline-block p-4 border-b-2 ${activeTab === 'project-list' ? 'text-red-600 border-red-600' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer`}
                                onClick={() => setActiveTab('project-list')}
                            >
                                Project List
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="p-4">
                    {activeTab === 'project-list' ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Project List</h2>
                            {loading ? (
                                <p>Loading projects...</p>
                            ) : experience.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employer</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Area</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {experience.map((proj) => (
                                                <tr key={proj.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{proj.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proj.employer}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proj.periode}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proj.total_area} m²</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-center">No projects available</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{categories.find(cat => cat.id === activeTab)?.name || 'Loading...'}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {loading ? (
                                    Array.from({ length: itemsPerPage }).map((_, index) => (
                                        <SkeletonCard key={index} />
                                    ))
                                ) : paginatedExperiences.length > 0 ? (
                                    paginatedExperiences.map((exp) => (
                                        <div key={exp.id}  className="bg-white shadow-md rounded-tl-2xl rounded-br-2xl overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                                            <a href="#">
                                                <img className="w-full h-48 object-cover" src={`http://tech.jayacm.co.id:8081/jayacm/assets/img/experience/${exp.image}`} alt={exp.name} />
                                            </a>
                                                <div className="p-4">
                                                <h2 className="text-lg font-semibold">{exp.name}</h2>
                                                {exp.location && (
                                                <p className="text-gray-600 flex items-center mb-2 mt-2">
                                                    <FaMapMarkerAlt className="mr-2" />{exp.location}
                                                </p>
                                                )}
                                                {exp.periode && (
                                                <p className="text-gray-600 flex items-center mb-2">
                                                    <FaCalendarAlt className="mr-2" />{exp.periode}
                                                </p>
                                                )}
                                                {exp.employer && (
                                                <p className="text-gray-600 flex items-center mb-2">
                                                    <FaBuilding className="mr-2" />{exp.employer}
                                                </p>
                                                )}
                                                {exp.total_area && (
                                                <p className="text-gray-600 flex items-center mb-2">
                                                    <FaRulerCombined className="mr-2" />{exp.total_area} m<sup>2</sup>
                                                </p>
                                                )}
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-center">No experiences available</p>
                                )}
                            </div>
                            
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="red__jcm text-white px-4 py-2 rounded-lg mx-2"
                                >
                                    Prev
                                </button>
                                <span className="px-4 py-2"> {currentPage} of {Math.ceil(allExperiences.length / itemsPerPage)}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(allExperiences.length / itemsPerPage)}
                                    className="red__jcm text-white px-4 py-2 rounded-lg mx-2"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
