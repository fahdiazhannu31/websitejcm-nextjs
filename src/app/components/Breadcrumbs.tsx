"use client";
import React from 'react';
import { usePathname } from 'next/navigation';

// Function to capitalize the first letter of each word
const capitalizeWords = (text: string) => {
    return text.replace(/\b\w/g, char => char.toUpperCase());
};

export default function Breadcrumbs() {
    const pathname = usePathname();

    if (!pathname || pathname === '/') {
        return null; // Do not display breadcrumb if the pathname is root
    }

    // Split the pathname into segments and filter out empty segments
    const pathSegments = pathname.split('/').filter(Boolean);

    // Build breadcrumb items
    const breadcrumbItems = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        return { href, label: capitalizeWords(segment.replace(/-/g, ' ')) }; // Replace hyphens with spaces and capitalize each word
    });

    // Add home item
    const breadcrumbs = [{ href: '/', label: 'Home' }, ...breadcrumbItems];

    return (
        <>
        <div className="container mx-auto pt-16 mt-36 flex flex-wrap items-start px-4">
            <nav className="flex mb-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {breadcrumbs.map((breadcrumb, index) => (
                        <li key={index} className="inline-flex items-center">
                            {index < breadcrumbs.length - 1 ? (
                                <>
                                    <a
                                        href={breadcrumb.href}
                                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {breadcrumb.label}
                                    </a>
                                    <svg
                                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
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
                                </>
                            ) : (
                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                    {breadcrumb.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
        </>
    );
}
