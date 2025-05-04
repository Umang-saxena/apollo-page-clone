"use client";

import React, { useState, useEffect, useCallback } from 'react';
import DoctorCard from './DoctorCard';
import FilterSidebar from './FilterSidebar';
import { useRouter, useSearchParams } from 'next/navigation';

const DoctorList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  // Extract current filters from URL
  const currentFilters = {
    consultMode: searchParams.get('consultMode')?.split(',').filter(Boolean) || [],
    experience: searchParams.get('experience')?.split(',').filter(Boolean) || [],
    fees: searchParams.get('fees')?.split(',').filter(Boolean) || [],
    languages: searchParams.get('languages')?.split(',').filter(Boolean) || [],
    facilities: searchParams.get('facilities')?.split(',').filter(Boolean) || [],
  };

  // Fetch doctor list whenever filters or pagination change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const page = searchParams.get('page') || '1';
        const consultMode = searchParams.get('consultMode') || '';
        const experience = searchParams.get('experience') || '';
        const fees = searchParams.get('fees') || '';
        const languages = searchParams.get('languages') || '';
        const facilities = searchParams.get('facilities') || '';

        const endpoint = `/api/list-doctor-with-filter?page=${page}&limit=8` +
          (consultMode ? `&consultMode=${consultMode}` : '') +
          (experience ? `&experience=${experience}` : '') +
          (fees ? `&fees=${fees}` : '') +
          (languages ? `&languages=${languages}` : '') +
          (facilities ? `&facilities=${facilities}` : '');

        console.log('Fetching from:', endpoint);

        const response = await fetch(endpoint);
        const data = await response.json();

        setDoctors(data.doctors);
        setTotalPages(data.totalPages);
        setCurrentPage(Number(page));
        setHasFetchedOnce(true); // ✅ allow filter interaction after first fetch

      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams.toString()]);

  // Apply filters (called by FilterSidebar)
  const applyFilters = useCallback((filterType, values) => {
    if (!hasFetchedOnce) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    if (values && values.length > 0) {
      params.set(filterType, values.join(','));
    } else {
      params.delete(filterType);
    }

    router.push(`?${params.toString()}`);
  }, [router, searchParams, hasFetchedOnce]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <FilterSidebar
        currentFilters={currentFilters}
        onFilterChange={applyFilters}
      />

      <div className="flex-1 p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#02475b]">
            Consult General Physicians Online - Internal Medicine Specialists
          </h1>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          <a href="/newDoctor" className="text-white0 hover:underline" target='_blank'>Add Doctor</a>
          </button>
          <p className="text-gray-600">({doctors.length} doctors)</p>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02475b]"></div>
          </div>
        )}

        {/* Doctor Cards */}
        {!loading && doctors.length > 0 && doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            {...doctor}
          />
        ))}

        {/* No Results Message */}
        {!loading && doctors.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600">No doctors found matching your criteria</p>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && doctors.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 bg-[#02475b] text-white rounded-lg mr-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-[#02475b] text-white rounded-lg"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
