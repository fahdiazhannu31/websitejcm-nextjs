"use client";
import { useState, useEffect } from 'react';
import axiosClient from '../../utils/axiosClient'; // Adjust the path based on your project structure

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

export default function Bod() {
    const [commissionerData, setCommissionerData] = useState<any[]>([]);
    const [directorsData, setDirectorsData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCommisionerData = async () => {
            try {
                const response = await axiosClient.get('/bodByPosition/commissioner');
                console.log(response.data); // Debugging line
                setCommissionerData(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCommisionerData();
    },
    
    []);

    useEffect(() => {
        const fetchDirectorData = async () => {
            try {
                const response = await axiosClient.get('/bodByPosition/directors');
                console.log(response.data); // Debugging line
                setDirectorsData(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDirectorData();
    },
    
    []);

    return (
        <div className="container mx-auto mt-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                    <div className="inline-block py-2 transition-colors duration-300 mb-5">
                        <h1 className=" text__red border-b-2">Board of Commissioner</h1>
                    </div>

                    {loading && <SkeletonLoader />}
                    {error && <p className="text__red">{error}</p>}
                    {!loading && !error && (
                        <ol className="relative border-s border-gray-200 dark:border-gray-700">
                            {commissionerData.map((member) => (
                                <li key={member.id} className="mb-4 ms-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="mb-1 text-sm font-normal leading-none text__red dark:text-gray-500">
                                        {member.position_name}
                                    </time>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {member.name}
                                    </h3>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="inline-block py-2 transition-colors duration-300 mb-5">
                        <h1 className=" text__red border-b-2">Board of Director</h1>
                    </div>

                    {loading && <SkeletonLoader />}
                    {error && <p className="text__red">{error}</p>}
                    {!loading && !error && (
                        <ol className="relative border-s border-gray-200 dark:border-gray-700">
                            {directorsData.map((member) => (
                                <li key={member.id} className="mb-4 ms-4">
                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time className="mb-1 text-sm font-normal leading-none text__red dark:text-gray-500">
                                        {member.position_name}
                                    </time>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {member.name}
                                    </h3>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
}
