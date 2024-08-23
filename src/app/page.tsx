"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton component
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton styles
import Link from 'next/link';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaRulerCombined,FaArrowRight } from 'react-icons/fa';

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

interface ExperienceItem {
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


interface CarouselItem {
  image: string;
}

const itemsPerPage = 4;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await axios.get('http://tech.jayacm.co.id:8081/jayacm/jayacm/api/project');
        setProjects(projectsResponse.data.map((item: any) => ({
          id: parseInt(item.id),
          image: item.image,
          name: item.name,
          description: item.description,
          location: item.location,
          periode: item.periode,
          employer: item.employer,
          total_area: item.total_area,
          size: item.size
        })));

        const carouselResponse = await axios.get('http://tech.jayacm.co.id:8081/jayacm/jayacm/api/carousel');
        setCarouselImages(carouselResponse.data.map((item: CarouselItem) => item.image));
        const experiencesResponse = await axios.get('http://tech.jayacm.co.id:8081/jayacm/jayacm/api/experience');
        const experiencesData = experiencesResponse.data.slice(0, 8).map((item: any) => ({
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
        setExperiences(experiencesData);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, []); // Fetch data only once on mount
  

  useEffect(() => {
    if (carouselImages.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [carouselImages.length]);

  const getPaginatedData = (): ProjectItem[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  };
  const getPaginatedExperienceData = (): ExperienceItem[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  

  return (
    <>
      {/* Carousel */}
      <div id="indicators-carousel" className="relative w-full">
        <div className="relative h-56 overflow-hidden md:h-96 z-20 mt-32 group">
          {carouselImages.length > 0 && carouselImages.map((src, index) => (
            <div
              key={index}
              className={`absolute w-full h-full top-0 left-0 transition-opacity duration-700 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={`http://tech.jayacm.co.id:8081/jayacm/assets/img/img-slider/${src}`}
                alt={`Carousel Image ${index}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                priority // Menambahkan properti priority untuk mempercepat loading gambar pada carousel
              />
            </div>
          ))}

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out focus:outline-none"
        onClick={() => setActiveIndex((activeIndex - 1 + carouselImages.length) % carouselImages.length)}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

    <button
      type="button"
      className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out focus:outline-none"
      onClick={() => setActiveIndex((activeIndex + 1) % carouselImages.length)}
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg
          className="w-4 h-4 text-white dark:text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="sr-only">Next</span>
      </span>
    </button>
  </div>

  <div className="absolute z-30 flex justify-center bottom-5 left-1/2 space-x-3 transform -translate-x-1/2">
    {carouselImages.length > 0 && carouselImages.map((_, index) => {
      if (activeIndex === 0 && index < 3) {
        return (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-gray-300'}`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        );
      } else if (activeIndex === carouselImages.length - 1 && index >= carouselImages.length - 3) {
        return (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-gray-300'}`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        );
      } else if (index === activeIndex - 1 || index === activeIndex || index === activeIndex + 1) {
        return (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-gray-300'}`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        );
      } else {
        return null;
      }
    })}
  </div>
</div>



      {/* About Us */}
      
      <div className="text-center my-10">
        <div className="inline-block px-4 py-2 transition-colors duration-300">
          <p className="text-2xl font-semibold text-black border-b-2 border-black">About us</p>
        </div>
      </div>

      <div className="container mx-auto mt-10 px-4 flex flex-wrap items-start">
        <div className="w-full md:w-1/2">
          <img
            src="/assets/images/gb1.jpg"
            alt="logojcm"
            className="w-full max-w-xl"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-justify">
            In 1976, the Construction Management Division of PT Pembangunan Jaya developed and applied the construction management system in projects entrusted to PT Pembangunan Jaya such as Bumi Hyatt Hotel Surabaya, Ratu Plaza Project, Aircraft Industrial Complex of IPTN Bandung, and other projects. As further development, PT JAYA CM was established on March 1st, 1983 and continued services for large-scale Commercial Buildings, Power Plants, Railways, Airports, and Toll Roads. Since 1976, we have delivered services for more than 10,000 million M² Buildings, 10,000 MW Power Plants, 400 KM Railways, and 190 KM Toll Roads.
          </p>
        </div>
      </div>

      {/* Current Projects */}

      <div className="w-full bg-gray-100 px-4 mx-auto mt-10">
      <div className="text-center my-10">
        <div className="inline-block px-4 py-2 transition-colors duration-300">
          <p className="text-2xl font-semibold text-black border-b-2 border-black mt-10">Current Projects</p>
        </div>
      </div>

        <div className="p-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(itemsPerPage)].map((_, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                  <Skeleton height={150} />
                  <div className="mt-4">
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={15} width="60%" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {getPaginatedData().map((project) => (
                  <div key={project.id}  className="bg-white shadow-md rounded-tl-2xl rounded-br-2xl overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <img
                      src={`http://tech.jayacm.co.id:8081/jayacm/assets/img/uploads/${project.image}`}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-medium">{project.name}</h2>
                      {project.location && (
                      <p className="text-gray-600 flex items-center mb-2 mt-2">
                        <FaMapMarkerAlt className="mr-2" />{project.location}
                      </p>
                    )}
                    {project.periode && (
                      <p className="text-gray-600 flex items-center mb-2">
                        <FaCalendarAlt className="mr-2" />{project.periode}
                      </p>
                    )}
                    {project.employer && (
                      <p className="text-gray-600 flex items-center mb-2">
                        <FaBuilding className="mr-2" />{project.employer}
                      </p>
                    )}
                    {project.total_area && (
                      <p className="text-gray-600 flex items-center mb-2">
                        <FaRulerCombined className="mr-2" />{project.total_area} m<sup>2</sup>
                      </p>
                    )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
              <Link href="projects/current-projects" className="text-red-700 flex items-center">
                See more <FaArrowRight className="ml-2" />
              </Link>
              {/* <button
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
              </button> */}
            </div>
            </>
          )}

        </div>

</div>
      <div className="w-full bg-white px-4 mx-auto mt-10">
      <div className="text-center my-10">
        <div className="inline-block px-4 py-2 transition-colors duration-300">
          <p className="text-2xl font-semibold text-black border-b-2 border-black">Experiences</p>
        </div>
      </div> 
        <div className="p-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(itemsPerPage)].map((_, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                  <Skeleton height={150} />
                  <div className="mt-4">
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={15} width="60%" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8  rounded-lg shadow-sm">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="relative group overflow-hidden bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="w-full h-36 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                  src={`http://tech.jayacm.co.id:8081/jayacm/assets/img/experience/${experience.image}`}
                  alt={experience.name}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <h3 className="text-white text-lg font-medium ml-2">{experience.name}</h3>
                </div>
              </div>
            ))}
          </div>
          )}
                  <div className="flex justify-end">
              <Link href="experiences/building" className="text-red-700 flex items-center">
                See more <FaArrowRight className="ml-2" />
              </Link>
              </div>
        </div>

      </div>




    </>
  );
}
