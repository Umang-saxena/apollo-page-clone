"use client";

import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDoctors();
  }, [currentPage]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/list-doctor-with-filter?page=${currentPage}&limit=8`);
      const data = await response.json();
      setDoctors(data.doctors);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex-1 p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#02475b]">
          Consult General Physicians Online - Internal Medicine Specialists
        </h1>
        <p className="text-gray-600">({doctors.length} doctors)</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02475b]"></div>
        </div>
      )}

      {/* Doctor Cards */}
      {!loading && doctors.map((doctor, index) => (
        <DoctorCard
          key={index}
          {...doctor}
        />
      ))}

      {/* Pagination Controls */}
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
    </div>
  );
};

export default DoctorList;
