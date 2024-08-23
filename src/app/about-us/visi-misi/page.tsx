"use client";
import { useState, useEffect } from 'react';
import axiosClient from '../../utils/axiosClient'; // Adjust the path based on your project structure

// Skeleton Loader Component
const SkeletonLoader = () => (
    <div className="animate-pulse">
        <div className="h-6 bg-gray-300 mb-4 rounded"></div>
        <div className="h-4 bg-gray-300 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 mb-2 rounded"></div>
    </div>
);

export default function VisiMisi() {
    const [vision, setVision] = useState<string>('');
    const [mission, setMission] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/visionMission');
                const data = response.data;

                setVision(data.vision.trim());  // Remove excessive whitespace
                setMission(data.mission.trim());  // Remove excessive whitespace
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-10 flex flex-wrap items-start px-4">
            <div className="w-full md:w-1/2">
                <img
                    src="/assets/images/visimisi.jpg"
                    alt="logojcm"
                    className="w-full max-w-xl"
                />
            </div>
            <div className="w-full md:w-1/2">
                {loading && <SkeletonLoader />}
                {error && <p className="text-red-500">{error}</p>}
                {(!loading && !error) && (
                    <div>
                        <div className="my-10">
                            <div className="inline-block py-2 transition-colors duration-300">
                                <h1 className="text__red border-b-2">Vision</h1>
                            </div>
                            <p className="text-justify mt-4">{vision}</p>
                        </div>
                        <div className="my-10">
                            <div className="inline-block py-2 transition-colors duration-300">
                                <h1 className="text__red border-b-2">Mission</h1>
                            </div>
                            <div className="text-justify mt-4" dangerouslySetInnerHTML={{ __html: mission }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
