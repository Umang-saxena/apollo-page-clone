"use client"
import React, { useState } from 'react';

// Reusable CheckboxGroup Component for filter sections
const CheckboxGroup = ({ title, options, selectedOptions, onChange }) => {
    return (
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
            {options.map((option) => (
                <label key={option} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes(option)}
                        onChange={() => onChange(option)}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-600">{option}</span>
                </label>
            ))}
        </div>
    );
};

const FilterSidebar = () => {
    // State for each filter section
    const [consultMode, setConsultMode] = useState(['Hospital Visit', 'Online']);
    const [experience, setExperience] = useState([]);
    const [fees, setFees] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [facilities, setFacilities] = useState([]);

    // Toggle checkbox state for each filter section
    const toggleCheckbox = (state, setState, value) => {
        setState((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    // Clear all filters
    const clearAll = () => {
        setConsultMode([]);
        setExperience([]);
        setFees([]);
        setLanguages([]);
        setFacilities([]);
    };

    // Filter options
    const consultOptions = ['Hospital Visit', 'Online'];
    const experienceOptions = ['0-5', '6-10', '11-16', '+1 More'];
    const feesOptions = ['100-500', '500-1000', '1000+'];
    const languageOptions = ['English', 'Hindi', 'Telugu', '+10 More'];
    const facilityOptions = ['Apollo Hospital', 'Other Clinics'];

    return (
        <div className="w-64 bg-white shadow-md rounded-lg p-4 sticky top-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <button
                    onClick={clearAll}
                    className="text-blue-600 text-sm hover:underline"
                >
                    Clear All
                </button>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md mb-6 hover:bg-blue-700 transition">
                Show Doctors Near Me
            </button>

            <CheckboxGroup
                title="Mode of Consult"
                options={consultOptions}
                selectedOptions={consultMode}
                onChange={(value) => toggleCheckbox(consultMode, setConsultMode, value)}
            />

            <CheckboxGroup
                title="Experience (In Years)"
                options={experienceOptions}
                selectedOptions={experience}
                onChange={(value) => toggleCheckbox(experience, setExperience, value)}
            />

            <CheckboxGroup
                title="Fees (In Rupees)"
                options={feesOptions}
                selectedOptions={fees}
                onChange={(value) => toggleCheckbox(fees, setFees, value)}
            />

            <CheckboxGroup
                title="Language"
                options={languageOptions}
                selectedOptions={languages}
                onChange={(value) => toggleCheckbox(languages, setLanguages, value)}
            />

            <CheckboxGroup
                title="Facility"
                options={facilityOptions}
                selectedOptions={facilities}
                onChange={(value) => toggleCheckbox(facilities, setFacilities, value)}
            />
        </div>
    );
};

export default FilterSidebar;