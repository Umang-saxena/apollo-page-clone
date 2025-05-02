"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// Reusable DoctorCard Component
const DoctorCard = ({
  name,
  specialty,
  experience,
  location,
  fees,
  cashback,
  rating,
  isDoctorOfTheHour,
  imageUrl,
}) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-4 mb-4">
      <Image
        src={imageUrl}
        alt={`${name}'s photo`}
        width={80}
        height={100}
        className="rounded-md mr-4"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{specialty}</p>
            <p className="text-sm text-gray-600">{experience}</p>
            <p className="text-sm text-gray-500">{location}</p>
            {rating && (
              <p className="text-sm text-green-600 mt-1">
                👍 {rating}
              </p>
            )}
          </div>
          <div className="text-right">
            {isDoctorOfTheHour && (
              <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded mb-2 inline-block">
                DOCTOR OF THE HOUR
              </span>
            )}
            <p className="text-lg font-bold text-gray-800">₹{fees}</p>
            {cashback && (
              <p className="text-sm text-orange-600">
                Circle ₹{cashback} Cashback
              </p>
            )}
            <button className="mt-2 border border-blue-600 text-blue-600 px-4 py-1 rounded-md hover:bg-blue-50 transition">
              Consult Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main DoctorList Component
const DoctorList = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [doctors, setDoctors] = useState([
    {
      name: 'Dr. Liritha C',
      specialty: 'General Physician/ Internal Medicine Specialist',
      experience: '5 years • MBBS, MD (General Medicine)',
      location: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
      fees: 429,
      cashback: null,
      rating: null,
      isDoctorOfTheHour: true,
      imageUrl: 'https://picsum.photos/80/100?random=1',
      experienceYears: 5,
      availability: 'Available Now',
    },
    {
      name: 'Dr. Rohinipriyanka Reddy',
      specialty: 'General Practitioner',
      experience: '9 years • MBBS',
      location: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
      fees: 479,
      cashback: 72,
      rating: '84% (125+ Patients)',
      isDoctorOfTheHour: false,
      imageUrl: 'https://picsum.photos/80/100?random=2',
      experienceYears: 9,
      availability: 'Available Today',
    },
    {
      name: 'Dr. Immanuel Raj',
      specialty: 'General Practitioner',
      experience: '8 years • MBBS, MBA (HHSM)',
      location: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
      fees: 450,
      cashback: 68,
      rating: null,
      isDoctorOfTheHour: false,
      imageUrl: 'https://picsum.photos/80/100?random=3',
      experienceYears: 8,
      availability: 'Available Tomorrow',
    },
  ]);

  const handleSort = (criteria) => {
    let sortedDoctors = [...doctors];
    
    switch (criteria) {
      case 'price_low_to_high':
        sortedDoctors.sort((a, b) => a.fees - b.fees);
        break;
      case 'price_high_to_low':
        sortedDoctors.sort((a, b) => b.fees - a.fees);
        break;
      case 'experience_high_to_low':
        sortedDoctors.sort((a, b) => b.experienceYears - a.experienceYears);
        break;
      case 'available_now':
        sortedDoctors.sort((a, b) => {
          if (a.availability === 'Available Now') return -1;
          if (b.availability === 'Available Now') return 1;
          return 0;
        });
        break;
      case 'available_today':
        sortedDoctors.sort((a, b) => {
          if (a.availability === 'Available Today') return -1;
          if (b.availability === 'Available Today') return 1;
          return 0;
        });
        break;
      default:
        // Default sorting (relevance) - restore original order
        break;
    }
    
    setDoctors(sortedDoctors);
    setSortBy(criteria);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex-1 p-4">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-[#02475b]">
            Consult General Physicians Online - Internal Medicine Specialists
          </h1>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-[#02475b] text-[#02475b] rounded-lg hover:bg-[#02475b] hover:text-white transition-all duration-200 font-medium"
            >
              <span className="text-sm">
                {sortBy === 'relevance' ? 'Sort By' : `Sorted by: ${sortBy.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-gray-100 overflow-hidden">
                <div className="py-1">
                  <div className="px-3 py-2 text-xs font-semibold text-[#02475b] bg-gray-50">AVAILABILITY</div>
                  <button 
                    onClick={() => handleSort('available_now')}
                    className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[#02475b] transition-colors duration-150"
                  >
                    Available Now
                  </button>
                  <button 
                    onClick={() => handleSort('available_today')}
                    className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[#02475b] transition-colors duration-150"
                  >
                    Available Today
                  </button>
                  
                  <div className="px-3 py-2 text-xs font-semibold text-[#02475b] bg-gray-50 border-t">PRICE</div>
                  <button 
                    onClick={() => handleSort('price_low_to_high')}
                    className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[#02475b] transition-colors duration-150"
                  >
                    Price: Low to High
                  </button>
                  <button 
                    onClick={() => handleSort('price_high_to_low')}
                    className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[#02475b] transition-colors duration-150"
                  >
                    Price: High to Low
                  </button>
                  
                  <div className="px-3 py-2 text-xs font-semibold text-[#02475b] bg-gray-50 border-t">EXPERIENCE</div>
                  <button 
                    onClick={() => handleSort('experience_high_to_low')}
                    className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[#02475b] transition-colors duration-150"
                  >
                    Experience: Most to Least
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-600">({doctors.length} doctors)</p>
      </div>

      {/* Doctor Cards */}
      {doctors.map((doctor, index) => (
        <DoctorCard
          key={index}
          name={doctor.name}
          specialty={doctor.specialty}
          experience={doctor.experience}
          location={doctor.location}
          fees={doctor.fees}
          cashback={doctor.cashback}
          rating={doctor.rating}
          isDoctorOfTheHour={doctor.isDoctorOfTheHour}
          imageUrl={doctor.imageUrl}
        />
      ))}
    </div>
  );
};

export default DoctorList;