'use client';

import { useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import Image from 'next/image';

export default function Navbar() {
    const [location, setLocation] = useState('Select Address');

    return (
        <nav className="border-b border-gray-200 bg-white shadow-md w-full max-w-none m-0 p-0">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 space-x-8">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Image src="/apollo-logo.jpeg" alt="Apollo 24|7" className="h-16" width={200} height={200} />
                </div>

                {/* Location + Search */}
                <div className="flex-1 flex items-center space-x-4 max-w-3xl mx-4">
                    <div className="flex items-center text-sm text-gray-700">
                        <HiOutlineLocationMarker className="text-xl mr-1 text-gray-500" />
                        <span className="font-semibold cursor-pointer">{location}</span>
                        <span className="ml-1">▼</span>
                    </div>
                    <div className="flex items-center flex-1 border border-gray-300 rounded-md px-3 py-1.5 bg-gray-50">
                        <FaSearch className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search Doctors, Specialities, Conditions etc."
                            className="w-full bg-transparent focus:outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Login */}
                <button className="flex items-center border border-cyan-700 text-cyan-700 px-3 py-3 rounded-md text-sm font-medium hover:bg-cyan-50">
                    <FaUserCircle className="mr-1.5 text-lg" />
                    Login
                </button>
            </div>

            {/* Bottom Nav Links */}
            <div className="flex justify-center space-x-6 text-sm font-medium text-gray-700 px-4 py-2">
                <a href="#" className="hover:text-cyan-700">Buy Medicines</a>
                <a href="#" className="hover:text-cyan-700">Find Doctors</a>
                <a href="#" className="hover:text-cyan-700">Lab Tests</a>
                <a href="#" className="hover:text-cyan-700">Circle Membership</a>
                <a href="#" className="hover:text-cyan-700">Health Records</a>
                <a href="#" className="hover:text-cyan-700">Diabetes Reversal</a>
                <div className="flex items-center space-x-1">
                    <a href="#" className="hover:text-cyan-700">Buy Insurance</a>
                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-1.5 py-0.5 rounded">New</span>
                </div>
            </div>
        </nav>
    );
}
