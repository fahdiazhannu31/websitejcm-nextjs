"use client";
import useSWR from 'swr';
import axiosClient from '../../../utils/axiosClient';
import Image from 'next/image';
import Link from 'next/link';

// Temporary Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-300 mb-4 rounded"></div>
    <div className="h-4 bg-gray-300 mb-2 rounded"></div>
    <div className="h-4 bg-gray-300 mb-2 rounded"></div>
    <div className="h-4 bg-gray-300 mb-2 rounded"></div>
  </div>
);

function sanitizeHtml(html: string) {
  return html
    .replace(/<ul[^>]*>/g, '<ul class="list-disc list-inside text-black text-justify dark:text-gray-400">')
    .replace(/<li[^>]*>/g, '<li class="mb-1">')
    .replace(/<\/ul>/g, '</ul>')
    .replace(/<\/li>/g, '</li>');
}

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

const fetcher = (url: string) => axiosClient.get(url).then(res => res.data);

interface CareerPageProps {
  params: {
    slug: string;
  };
}

export default function CareerPage({ params }: CareerPageProps) {
  const { slug } = params;

  const { data: careerData, error } = useSWR(
    slug ? `/careerDetail/${slug}` : null,
    fetcher
  );

  if (!slug) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-10 px-4">
      {error && <p className="text-red-500">Failed to fetch data. Please try again later.</p>}
      {!error && !careerData && <SkeletonLoader />}
      {careerData && Array.isArray(careerData) && careerData.length > 0 && (
        <div className="mt-10">
          {careerData.map((career: Career) => (
             <div key={career.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={`http://tech.jayacm.co.id:8081/jayacm/assets/img/career/${career.image}`}
                  alt={career.position}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-800 dark:text-white">
                  {career.position}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <strong>Min.</strong> {career.education}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                  <strong>Exp.</strong> {career.experience}
                </p>
                <strong>Job Desc : </strong>
                <div
                  className="prose dark:prose-invert mt-2" // Prose classes for typographic styles
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(career.job_description) }}
                />
                <div className="p-3">
                  <Link href={`/career/apply/${career.slug}`} className="bg-red-800 hover:bg-red-950 text-white rounded-md py-2 px-5 mt-6 inline-block">
                    Apply
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!error && !careerData && Array.isArray(careerData) && careerData.length === 0 && (
        <p className="text-gray-500">No careers found.</p>
      )}
    </div>
  );
}
