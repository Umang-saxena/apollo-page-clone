"use client";

import React from 'react';
import Image from 'next/image';

const DoctorCard = ({
    name,
    specialty,
    experience,
    location,
    fees,
    cashback,
    rating, // Rating is an object
    isDoctorOfTheHour,
    imageUrl,
}) => {
    // Destructure rating object if available
    const { percentage, totalPatients } = rating || {};

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
                        {/* Render experience details */}
                        <p className="text-sm text-gray-600">
                            {experience.years} years of experience
                        </p>
                        <p className="text-sm text-gray-600">{experience.qualification}</p>
                        {/* Render location details */}
                        <p className="text-sm text-gray-500">{location.clinic}</p>
                        <p className="text-sm text-gray-500">{location.city}, {location.state}</p>
                        {/* Render rating details */}
                        {rating && percentage && totalPatients && (
                            <p className="text-sm text-green-600 mt-1">
                                👍 {percentage}% (Based on {totalPatients} patients)
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

export default DoctorCard;
