"use client";
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState({
    aboutUs: false,
    services: false,
    experience: false,
    clientAndPartners: false,
  });
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRefs = {
    aboutUs: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    clientAndPartners: useRef<HTMLDivElement>(null),
  };

  const submenuRefs = {
    partners: useRef<HTMLDivElement>(null),
    clients: useRef<HTMLDivElement>(null),
  };

  const currentPath = usePathname();

  const toggleDropdown = (dropdownName: string) => {
    setDropdownOpen(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName],
    }));
  };

  const toggleSubmenu = (submenuName: string) => {
    setDropdownOpen(prev => ({
      ...prev,
      [submenuName]: !prev[submenuName],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.values(dropdownRefs).forEach(ref => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setDropdownOpen(prev => ({
            ...prev,
            [Object.keys(dropdownRefs).find(key => ref.current === dropdownRefs[key].current) as string]: false,
          }));
        }
      });
      Object.values(submenuRefs).forEach(ref => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setDropdownOpen(prev => ({
            ...prev,
            [Object.keys(submenuRefs).find(key => ref.current === submenuRefs[key].current) as string]: false,
          }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAboutUsActive = currentPath.startsWith('/about-us');
  const isServiceActive = currentPath.startsWith('/services');
  const isExperienceActive = currentPath.startsWith('/experiences');
  const isClientActive = currentPath.startsWith('/our-clients');
  const isPartnersActive = currentPath.startsWith('/partners');
  const isProjectsActive = currentPath.startsWith('/projects'); 
  const isContactActive = currentPath.startsWith('/contact-us'); 
  const isCareerActive = currentPath.startsWith('/career'); 
  



  return (
    <>
      <div className={`bg-white border-gray-200 fixed w-full z-50 top-0 start-0 transition-transform duration-300 ${isScrolled ? 'hidden' : ''}`}>
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-5 relative">
          <Link legacyBehavior href="/">
            <a className={`flex items-center ${isScrolled ? 'hidden' : ''}`}>
              <img src="/assets/images/logo.png" className="h-11" alt="Logo" />
            </a>
          </Link>
          <Link legacyBehavior href="/">
            <a className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isScrolled ? 'hidden' : ''}`}>
              <img src="/assets/images/certif.jpeg" className="h-12" alt="Certification" />
            </a>
          </Link>
        </div>
      </div>

      <header className={`red__jcm border-gray-200 fixed w-full z-40 start-0 shadow-lg transition-transform duration-300 ${isScrolled ? 'top-0' : 'top-20'}`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-2">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            type="button"
            className="absolute top-0 right-0 m-4 bg-white border border-gray-500 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2"
            aria-controls="navbar-multi-level"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

            <div className={`w-full md:block md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-multi-level">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:red__jcm">
              <li className={currentPath === "/" ? "md:text-white" : ""}>
              <Link href="/" className="block py-2 px-3 md:text-dark rounded md:bg-transparent md:p-0 " aria-current="page">Home</Link>
            </li>

            <li className={`relative ${isAboutUsActive ? 'md:text-white' : ''}`}>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-800 md:p-0 md:w-auto md:dark:hover:text-red-800 dark:focus:text-white dark:hover:bg-red-700 md:dark:hover:bg-transparent ${isAboutUsActive ? 'md:text-white' : ''}`}
                    onClick={() => toggleDropdown('aboutUs')}
                  >
                    About Us
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  <div ref={dropdownRefs.aboutUs} className={`absolute right-0 z-50 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:divide-gray-600 ${isDropdownOpen.aboutUs ? 'block' : 'hidden'}`}>
                    <ul className="py-2 text-sm text-gray-700">
                    <li className={currentPath === "/about-us/profile" ? "md:text-red-700" : ""}>
                        <Link href="/about-us/profile" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                      </li>
                      <li className={currentPath === "/about-us/visi-misi" ? "md:text-red-700" : ""}>
                        <Link href="/about-us/visi-misi" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Vision & Mission</Link>
                      </li>
                      <li className={currentPath === "/about-us/bod" ? "md:text-red-700" : ""}>
                        <Link href="/about-us/bod" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Member of The Board</Link>
                      </li>
                      <li className={currentPath === "/about-us/legal-bussiness-regist" ? "md:text-red-700" : ""}>
                        <Link href="/about-us/legal-bussiness-regist" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Legal & Bussiness Regist</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={`relative ${isServiceActive ? 'md:text-white' : ''}`}>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-800 md:p-0 md:w-auto md:dark:hover:text-red-800 dark:focus:text-white dark:hover:bg-red-700 md:dark:hover:bg-transparent ${isServiceActive ? 'md:text-white' : ''}`}
                    onClick={() => toggleDropdown('services')}
                  >
                    Service
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  <div ref={dropdownRefs.services} className={`absolute right-0 z-50 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:divide-gray-600 ${isDropdownOpen.services ? 'block' : 'hidden'}`}>
                    <ul className="py-2 text-sm text-gray-700">
                    <li className={currentPath === "/services/field-of-activity" ? "md:text-red-700" : ""}>
                        <Link href="/services/field-of-activity" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Field of Activity</Link>
                      </li>
                      <li className={currentPath === "/services/scope-of-service" ? "md:text-red-700" : ""}>
                        <Link href="/services/scope-of-service" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Scope of Service</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={currentPath === "/projects/current-projects" ? "md:text-white" : ""}>
              <Link href="/projects/current-projects" className="block py-2 px-3 md:text-dark rounded md:bg-transparent md:p-0 " aria-current="page">Projects</Link>
            </li>
                <li className={`relative ${isExperienceActive ? 'md:text-white' : ''}`}>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-800 md:p-0 md:w-auto md:dark:hover:text-red-800 dark:focus:text-white dark:hover:bg-red-700 md:dark:hover:bg-transparent ${isExperienceActive ? 'md:text-white' : ''}`}
                    onClick={() => toggleDropdown('experience')}
                  >
                    Experience
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  <div ref={dropdownRefs.experience} className={`absolute right-0 z-50 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:divide-gray-600 ${isDropdownOpen.experience ? 'block' : 'hidden'}`}>
                    <ul className="py-2 text-sm text-gray-700">
                    <li className={currentPath === "/experiences/building" ? "md:text-red-700" : ""}>
                        <Link href="/experiences/building" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Building</Link>
                      </li>
                      <li className={currentPath === "/experiences/industry" ? "md:text-red-700" : ""}>
                        <Link href="/experiences/industry" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Industry</Link>
                      </li>
                      <li className={currentPath === "/experiences/transportation" ? "md:text-red-700" : ""}>
                        <Link href="/experiences/transportation" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Transportation</Link>
                      </li>
                      <li className={currentPath === "/experiences/power-plant-transmission" ? "md:text-red-700" : ""}>
                        <Link href="/experiences/power-plant-transmission" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Power Plant & Tranmission</Link>
                      </li>
                      <li className={currentPath === "/experiences/other-project" ? "md:text-red-700" : ""}>
                        <Link href="/experiences/other-project" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Other Project</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={`relative ${isClientActive || isPartnersActive ? 'md:text-red-700' : ''}`}>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-800 md:p-0 md:w-auto md:dark:hover:text-red-800 dark:focus:text-white dark:hover:bg-red-700 md:dark:hover:bg-transparent ${isClientActive || isPartnersActive ? 'md:text-white' : ''}`}
                    onClick={() => toggleDropdown('clientAndPartners')}
                  >
                    Partners & Clients
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  <div ref={dropdownRefs.clientAndPartners} className={`absolute right-0 z-50 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:divide-gray-600 ${isDropdownOpen.clientAndPartners ? 'block' : 'hidden'}`}>
                    <ul className="py-2 text-sm text-gray-700">
                      <li className={`relative ${isDropdownOpen.partners ? 'md:text-red-700' : ''}`}>
                        <button
                          type="button"
                          className={`flex items-center justify-between w-full py-2 px-4 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                          onClick={() => toggleSubmenu('partners')}
                        >
                          Our Partner
                          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                          </svg>
                        </button>
                        <div ref={submenuRefs.partners} className={`absolute left-full top-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:divide-gray-600 ${isDropdownOpen.partners ? 'block' : 'hidden'}`}>
                          <ul className="py-2 text-sm text-gray-700">
                          <li className={currentPath === "/partners/building" ? "md:text-red-700" : ""}>
                            <Link href="/partners/building" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Building</Link>
                          </li>
                          <li className={currentPath === "/partners/industry" ? "md:text-red-700" : ""}>
                            <Link href="/partners/industry" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Industry</Link>
                          </li>
                          <li className={currentPath === "/partners/transportation" ? "md:text-red-700" : ""}>
                            <Link href="/partners/transportation" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Transportation</Link>
                          </li>
                          <li className={currentPath === "/partners/power-plant-transmission" ? "md:text-red-700" : ""}>
                            <Link href="/partners/power-plant-transmission" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Power Plant & Tranmission</Link>
                          </li>
                          <li className={currentPath === "/partners/other-projects" ? "md:text-red-700" : ""}>
                            <Link href="/partners/other-project" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Other Project</Link>
                          </li>
                          </ul>
                        </div>
                      </li>
                      <li className={`relative ${isDropdownOpen.clients ? 'md:text-red-700' : ''}`}>
                        <button
                          type="button"
                          className={`flex items-center justify-between w-full py-2 px-4 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                          onClick={() => toggleSubmenu('clients')}
                        >
                          Our Client
                          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                          </svg>
                        </button>
                        <div ref={submenuRefs.clients} className={`absolute left-full top-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:divide-gray-600 ${isDropdownOpen.clients ? 'block' : 'hidden'}`}>
                          <ul className="py-2 text-sm text-gray-700">
                          <li className={currentPath === "/our-clients/building" ? "md:text-red-700" : ""}>
                        <Link href="/our-clients/building" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Building</Link>
                      </li>
                      <li className={currentPath === "/our-clients/industry" ? "md:text-red-700" : ""}>
                        <Link href="/our-clients/industry" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Industry</Link>
                      </li>
                      <li className={currentPath === "/our-clients/transportation" ? "md:text-red-700" : ""}>
                        <Link href="/our-clients/transportation" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Transportation</Link>
                      </li>
                      <li className={currentPath === "/our-clients/power-plant-transmission" ? "md:text-red-700" : ""}>
                        <Link href="/our-clients/power-plant-transmission" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Power Plant & Tranmission</Link>
                      </li>
                      <li className={currentPath === "/our-clients/other-projects" ? "md:text-red-700" : ""}>
                        <Link href="/our-clients/other-projects" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Other Project</Link>
                      </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={`relative ${isContactActive ? 'md:text-white' : ''}`}>
                  <Link href="/contact-us" className="block py-2 px-3 md:text-dark rounded md:bg-transparent md:p-0" aria-current="page">Contact</Link>
                </li>
                <li className={`relative ${isCareerActive ? 'md:text-white' : ''}`}>
                  <Link href="/career" className="block py-2 px-3 md:text-dark rounded md:bg-transparent md:p-0" aria-current="page">Career</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
