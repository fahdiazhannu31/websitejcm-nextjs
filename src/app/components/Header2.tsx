"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isExperiencesDropdownOpen, setIsExperiencesDropdownOpen] = useState(false);
    const [isPartnerClientDropdownOpen, setIsPartnerClientDropdownOpen] = useState(false);
    const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false);
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const logoJcm = '/assets/images/logo.png';
    const logoCert = '/assets/images/certif.jpeg';
    const pathname = usePathname();
    const router = useRouter();

    // Refs for dropdowns
    const aboutDropdownRef = useRef(null);
    const servicesDropdownRef = useRef(null);
    const experiencesDropdownRef = useRef(null);
    const partnerClientDropdownRef = useRef(null);
    const partnerDropdownRef = useRef(null);
    const clientDropdownRef = useRef(null);

    // Toggle functions
    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const toggleDropdown = (dropdownSetter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
        dropdownSetter(prev => !prev);
    };

    // Check if the path is active
    const isActive = (path: string) => pathname === path;

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                aboutDropdownRef.current &&
                !aboutDropdownRef.current.contains(event.target as Node) &&
                isAboutDropdownOpen
            ) {
                setIsAboutDropdownOpen(false);
            }
            if (
                servicesDropdownRef.current &&
                !servicesDropdownRef.current.contains(event.target as Node) &&
                isServicesDropdownOpen
            ) {
                setIsServicesDropdownOpen(false);
            }
            if (
                experiencesDropdownRef.current &&
                !experiencesDropdownRef.current.contains(event.target as Node) &&
                isExperiencesDropdownOpen
            ) {
                setIsExperiencesDropdownOpen(false);
            }
            if (
                partnerClientDropdownRef.current &&
                !partnerClientDropdownRef.current.contains(event.target as Node) &&
                isPartnerClientDropdownOpen
            ) {
                setIsPartnerClientDropdownOpen(false);
            }
            if (
                partnerDropdownRef.current &&
                !partnerDropdownRef.current.contains(event.target as Node) &&
                isPartnerDropdownOpen
            ) {
                setIsPartnerDropdownOpen(false);
            }
            if (
                clientDropdownRef.current &&
                !clientDropdownRef.current.contains(event.target as Node) &&
                isClientDropdownOpen
            ) {
                setIsClientDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [
        isAboutDropdownOpen, 
        isServicesDropdownOpen, 
        isExperiencesDropdownOpen, 
        isPartnerClientDropdownOpen,
        isPartnerDropdownOpen,
        isClientDropdownOpen
    ]);

    return (
        <>
            {/* Logo and Image Container */}
            <div className={`bg-white border-gray-200 fixed w-full z-50 top-0 start-0 transition-transform duration-300 ${isScrolled ? 'hidden' : ''}`}>
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-5 relative">
                    <Link legacyBehavior href="/">
                        <a className={`flex items-center ${isScrolled ? 'hidden' : ''}`}>
                            <img src={logoJcm} className="h-11" alt="Logo" />
                        </a>
                    </Link>
                    <Link legacyBehavior href="/">
                        <a className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isScrolled ? 'hidden' : ''}`}>
                            <img src={logoCert} className="h-12" alt="Certification" />
                        </a>
                    </Link>
                </div>
            </div>

            {/* Navbar */}
            <nav className={`red__jcm border-gray-200 fixed w-full z-40 start-0 shadow-lg transition-transform duration-300 ${isScrolled ? 'top-0' : 'top-20'}`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-5">
                    <button
                        type="button"
                        onClick={toggleNav}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-dropdown"
                        aria-expanded={isNavOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className={`w-5 h-5 ${isNavOpen ? 'hidden' : 'block'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                        <svg className={`w-5 h-5 ${isNavOpen ? 'block' : 'hidden'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    <div className={`w-full md:w-auto ${isNavOpen ? 'block' : 'hidden'} md:block`} id="navbar-dropdown">
                        <ul className="flex flex-col text-lg p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:red__jcm">
                            <li>
                                <Link legacyBehavior href="/">
                                <a className={`py-2 ${isActive('/')  ? 'text-black md:text-white'  : 'text-white md:text-black'} rounded md:bg-transparent md:p-0`}aria-current={isActive('/') ? 'page' : undefined}>Home</a>
                                </Link>
                            </li>
                            <li className="relative" ref={aboutDropdownRef}>
                                <button
                                    type="button"
                                    onClick={toggleDropdown(setIsAboutDropdownOpen)}
                                    className={`flex items-center justify-between ${isActive('/about-us/profile')  ? 'text-black md:text-white'  : 'text-white md:text-black'} rounded md:bg-transparent md:text-black md:p-0`}

                                >
                                    About Us
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                <div className={`absolute top-full left-0 z-10 ${isAboutDropdownOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li>
                                            <Link legacyBehavior href="/about-us/profile">
                                                <a className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/about-us/visi-misi">
                                                <a className="block px-4 py-2 hover:bg-gray-100">Vision & Mission</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/about-us/bod">
                                                <a className="block px-4 py-2 hover:bg-gray-100">Board of Director</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative" ref={servicesDropdownRef}>
                                <button
                                    type="button"
                                    onClick={toggleDropdown(setIsServicesDropdownOpen)}
                                    className={`flex items-center justify-between ${isActive('/services') ? 'text-black bg-white' : 'text-black'} rounded md:bg-transparent md:text-white-800 md:p-0`} aria-current={isActive('/services') ? 'page' : undefined}
                                >
                                    Services
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                <div className={`absolute top-full left-0 z-10 ${isServicesDropdownOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li>
                                            <Link legacyBehavior href="/services/transportation">
                                                <a className="block px-4 py-2 hover:bg-gray-100">Transportation</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/services/building">
                                                <a className="block px-4 py-2 hover:bg-gray-100">Building</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/services/electrical">
                                                <a className="block px-4 py-2 hover:bg-gray-100">Electrical</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative" ref={experiencesDropdownRef}>
                                <button
                                    type="button"
                                    onClick={toggleDropdown(setIsExperiencesDropdownOpen)}
                                    className={`flex items-center justify-between ${isActive('/experiences') ? 'text-black bg-white' : 'text-black'} rounded md:bg-transparent md:text-white-800 md:p-0`} aria-current={isActive('/experiences') ? 'page' : undefined}
                                >
                                    Experiences
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                <div className={`absolute top-full left-0 z-10 ${isExperiencesDropdownOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li>
                                            <Link legacyBehavior href="/experiences/projects">
                                                <a className="block px-4 py-2 hover:bg-gray-100">Projects</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/experiences/case-studies">
                                                <a className="block px-4 py-2 hover:bg-gray-100">Case Studies</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative" ref={partnerClientDropdownRef}>
                                <button
                                    type="button"
                                    onClick={toggleDropdown(setIsPartnerClientDropdownOpen)}
                                    className={`flex items-center justify-between ${isActive('/partner-client') ? 'text-black bg-white' : 'text-black'} rounded md:bg-transparent md:text-white-800 md:p-0`} aria-current={isActive('/partner-client') ? 'page' : undefined}
                                >
                                    Partner & Client
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                <div className={`absolute top-full left-0 z-10 ${isPartnerClientDropdownOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li>
                                            <button
                                                type="button"
                                                onClick={toggleDropdown(setIsPartnerDropdownOpen)}
                                                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                            >
                                                Our Partner
                                                <svg className="w-2.5 h-2.5 ms-2.5 float-right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                </svg>
                                            </button>
                                            <div className={`absolute top-full left-0 z-20 ${isPartnerDropdownOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                                <ul className="py-2 text-sm text-gray-700">
                                                    <li>
                                                        <Link legacyBehavior href="/partner-client/our-partner">
                                                            <a className="block px-4 py-2 hover:bg-gray-100">Our Partner</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={toggleDropdown(setIsClientDropdownOpen)}
                                                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                            >
                                                Our Client
                                                <svg className="w-2.5 h-2.5 ms-2.5 float-right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                </svg>
                                            </button>
                                            <div className={`absolute top-full left-0 z-20 ${isClientDropdownOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                                <ul className="py-2 text-sm text-gray-700">
                                                    <li>
                                                        <Link legacyBehavior href="/partner-client/our-client">
                                                            <a className="block px-4 py-2 hover:bg-gray-100">Our Client</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};