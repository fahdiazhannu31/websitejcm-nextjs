"use client";
import { useState, useEffect } from "react";
import axiosClient from "../../utils/axiosClient";
import SkeletonLoader from "./components/SkeletonLoader";
import parse from 'html-react-parser';

interface TabData {
  description: string;
  name: string;
}

// Fungsi untuk mengonversi <ul> menjadi <ol>
const convertUlToOl = (html: string): string => {
  // Replace <ul> with <ol> and ensure each <li> is retained
  return html
    .replace(/<ul>/g, '<ul className="text-gray-500 list-disc list-inside dark:text-gray-400">')
    .replace(/<\/ul>/g, '</ul>')
    .replace(/<li/g, '<li')
    .replace(/<\/li>/g, '</li>');
};

export default function ScopeService() {
  const [activeTab, setActiveTab] = useState("Planning and Feasibility Study");
  const [tabData, setTabData] = useState<TabData>({ description: "", name: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await axiosClient.get(`/serviceById/${id}`); // Use relative URL
      setTabData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    switch (activeTab) {
      case "Planning and Feasibility Study":
        fetchData(1);
        break;
      case "Design and Engineering":
        fetchData(2);
        break;
      case "Project Management":
        fetchData(3);
        break;
      case "Construction Management":
        fetchData(5);
        break;
      case "Quantity Surveying":
        fetchData(6);
        break;
      default:
        break;
    }
  }, [activeTab]);

  const renderedDescription = convertUlToOl(tabData.description);

  return (

    <div className="container mx-auto mt-10 flex flex-wrap items-start px-4">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow  ">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select tab</label>
          <select
            id="tabs"
            className="red__jcm text-white border-0 border-b border-gray-200 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setActiveTab(e.target.value)}
            value={activeTab}
          >
            <option value="Planning and Feasibility Study">Planning and Feasibility Study</option>
            <option value="Design and Engineering">Design and Engineering and Engineering</option>
            <option value="Project Management">Project Management Management</option>
            <option value="Construction Management">Construction Management</option>
            <option value="Quantity Surveying">Quantity Surveying</option>
          </select>
        </div>
        <ul
          className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex  rtl:divide-x-reverse"
          id="fullWidthTab"
          role="tablist"
        >
          {["Planning and Feasibility Study", "Design and Engineering", "Project Management", "Construction Management", "Quantity Surveying"].map(tab => (
            <li key={tab} className="w-full">
              <button
                type="button"
                className={`inline-block w-full p-4 ${activeTab === tab ? "red__jcm text-white " : "bg-gray-100 dark:bg-gray-600"} focus:outline-none`}
                onClick={() => setActiveTab(tab)}
                aria-selected={activeTab === tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace("_", " ")}
              </button>
            </li>
          ))}
        </ul>

        <div id="fullWidthTabContent" className="border-t border-gray-200 ">
          <div className="p-4 bg-white rounded-lg md:p-8 " role="tabpanel">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <>
                {error && (
                  <div className="text-red-500">{error}</div>
                )}
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight dark:text-black">{tabData.name}</h2>
                <div className="list-decimal list-inside">
                  {parse(renderedDescription)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
