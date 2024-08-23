"use client";
import { useState, useEffect } from 'react';
import axiosClient from '../../utils/axiosClient'; // Adjust the path as needed
import Link from 'next/link';

// Skeleton Loader Component
const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
        </div>
    </div>
);

// Define interfaces for your data
interface LegalItem {
  id: number;
  name: string;
  regist_number: string;
  published_by: string;
  published_date: string;
}

interface BusinessItem {
  id: number;
  name: string;
  regist_number: string;
  published_by: string;
  published_date: string;
}

export default function LegalBusiness() {
    const [activeTab, setActiveTab] = useState('Legal');
    const [services, setServices] = useState<any[]>([]);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [legalData, setLegalData] = useState<LegalItem[]>([]);
    const [businessData, setBusinessData] = useState<BusinessItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all services once on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/service');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Fetch selected service data when the active sub-tab changes
    useEffect(() => {
        const fetchServiceData = async () => {
            const id = getServiceIdFromTab(activeTab);
            if (id) {
                try {
                    const response = await axiosClient.get(`/serviceById/${id}`);
                    setSelectedService(response.data);
                } catch (error) {
                    console.error('Error fetching service data:', error);
                }
            }
        };

        fetchServiceData();
    }, [activeTab]);

    // Fetch legal data when the "Legal" tab is active
    useEffect(() => {
        if (activeTab === 'Legal') {
            const fetchLegalData = async () => {
                setLoading(true);
                try {
                    const response = await axiosClient.get('/legalBusiness/legal');
                    setLegalData(response.data);
                } catch (error) {
                    setError('Failed to fetch legal data.');
                } finally {
                    setLoading(false);
                }
            };

            fetchLegalData();
        }
    }, [activeTab]);

    // Fetch business data when the "Bussiness" tab is active
    useEffect(() => {
        if (activeTab === 'Bussiness') {
            const fetchBusinessData = async () => {
                setLoading(true);
                try {
                    const response = await axiosClient.get('/legalBusiness/business');
                    setBusinessData(response.data);
                } catch (error) {
                    setError('Failed to fetch business data.');
                } finally {
                    setLoading(false);
                }
            };

            fetchBusinessData();
        }
    }, [activeTab]);

    // Map sub-tab to service ID
    const getServiceIdFromTab = (tab: string): string => {
        switch (tab) {
            case 'planning':
                return '1'; // ID for Planning and Feasibility Study
            case 'design':
                return '2'; // Replace with actual ID
            case 'project':
                return '3'; // Replace with actual ID
            case 'construction':
                return '5'; // Replace with actual ID
            case 'quantity':
                return '6'; // Replace with actual ID
            default:
                return '';
        }
    };

    return (
        <div className="container mx-auto mt-10 px-4">
            {/* Tab Navigation */}
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <Link href="#">
                            <span
                                className={`inline-block p-4 border-b-2 ${activeTab === 'Legal' ? 'text-red-600 border-red-600' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer`}
                                onClick={() => setActiveTab('Legal')}
                            >
                                Legal Registration
                            </span>
                        </Link>
                    </li>
                    <li className="me-2">
                        <Link href="#">
                            <span
                                className={`inline-block p-4 border-b-2 ${activeTab === 'Bussiness' ? 'text-red-600 border-red-600' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer`}
                                onClick={() => setActiveTab('Bussiness')}
                            >
                                Bussiness Registration
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Content */}
            <div className="p-4">
                {loading && <SkeletonLoader />}
                {error && <p className="text-red-500">{error}</p>}
                {activeTab === 'Legal' && !loading && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Legal Registration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {legalData.length > 0 ? (
                                legalData.map(item => (
                                    <div key={item.id} className="card p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <div className="card-content">
                                            <p className="mt-2"><strong>Registration Number:</strong> {item.regist_number}</p>
                                            <p><strong>Published By:</strong> {item.published_by}</p>
                                            <p><strong>Published Date:</strong> {new Date(item.published_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No legal data available.</p>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === 'Bussiness' && !loading && (
                    <div className="container mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Bussiness Registration</h2>
                        {businessData.length > 0 ? (
                            businessData.map(item => (
                                <div key={item.id} className="card p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="mt-2"><strong>Registration Number:</strong> {item.regist_number}</p>
                                    <p><strong>Published By:</strong> {item.published_by}</p>
                                    <p><strong>Published Date:</strong> {new Date(item.published_date).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No business data available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
