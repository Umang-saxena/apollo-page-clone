"use client";
import React, { useState, useEffect } from 'react';

// Reusable CheckboxGroup Component for filter sections
const CheckboxGroup = ({ title, options, selectedOptions, onChange, showMore, onShowMore }) => {
    const isMoreOption = (option) => option.startsWith('+');
    
    return (
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
            {options.map((option) => (
                isMoreOption(option) ? (
                    <button
                        key={option}
                        onClick={onShowMore}
                        className="text-blue-600 text-sm hover:underline mb-2"
                    >
                        {option}
                    </button>
                ) : (
                    <label key={option} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(option)}
                            onChange={() => onChange(option)}
                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="text-gray-600">{option}</span>
                    </label>
                )
            ))}
        </div>
    );
};

const FilterSidebar = ({ currentFilters = {}, onFilterChange }) => {
    // State for showing more options
    const [showMoreExperience, setShowMoreExperience] = useState(false);
    const [showMoreLanguages, setShowMoreLanguages] = useState(false);

    // Filter options
    const consultOptions = ['Hospital Visit', 'Online'];
    const experienceOptions = ['0-5', '6-10', '11-16', '+1 More'];
    const feesOptions = ['100-500', '500-1000', '1000+'];
    const languageOptions = ['English', 'Hindi', 'Telugu', '+10 More'];
    const facilityOptions = ['Apollo Hospital', 'Other Clinics'];

    // Additional options that appear when "More" is clicked
    const additionalExperienceOptions = ['17-20', '20+'];
    const additionalLanguageOptions = ['Bengali', 'Tamil', 'Kannada', 'Malayalam', 'Gujarati', 'Marathi', 'Punjabi', 'Urdu', 'Odia', 'Assamese'];

    // Use the filtered state directly from props instead of maintaining local state
    const consultMode = currentFilters.consultMode || [];
    const experience = currentFilters.experience || [];
    const fees = currentFilters.fees || [];
    const languages = currentFilters.languages || [];
    const facilities = currentFilters.facilities || [];

    // Handlers for checkbox changes
    const handleConsultModeChange = (value) => {
        const newSelection = consultMode.includes(value)
            ? consultMode.filter(item => item !== value)
            : [...consultMode, value];
        onFilterChange('consultMode', newSelection);
    };

    const handleExperienceChange = (value) => {
        const newSelection = experience.includes(value)
            ? experience.filter(item => item !== value)
            : [...experience, value];
        onFilterChange('experience', newSelection);
    };

    const handleFeesChange = (value) => {
        const newSelection = fees.includes(value)
            ? fees.filter(item => item !== value)
            : [...fees, value];
        onFilterChange('fees', newSelection);
    };

    const handleLanguagesChange = (value) => {
        const newSelection = languages.includes(value)
            ? languages.filter(item => item !== value)
            : [...languages, value];
        onFilterChange('languages', newSelection);
    };

    const handleFacilitiesChange = (value) => {
        const newSelection = facilities.includes(value)
            ? facilities.filter(item => item !== value)
            : [...facilities, value];
        onFilterChange('facilities', newSelection);
    };

    // Clear all filters
    const clearAll = () => {
        onFilterChange('consultMode', []);
        onFilterChange('experience', []);
        onFilterChange('fees', []);
        onFilterChange('languages', []);
        onFilterChange('facilities', []);
    };

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
                onChange={handleConsultModeChange}
            />

            <CheckboxGroup
                title="Experience (In Years)"
                options={showMoreExperience ? [...experienceOptions.slice(0, -1), ...additionalExperienceOptions] : experienceOptions}
                selectedOptions={experience}
                onChange={handleExperienceChange}
                onShowMore={() => setShowMoreExperience(!showMoreExperience)}
            />

            <CheckboxGroup
                title="Fees (In Rupees)"
                options={feesOptions}
                selectedOptions={fees}
                onChange={handleFeesChange}
            />

            <CheckboxGroup
                title="Language"
                options={showMoreLanguages ? [...languageOptions.slice(0, -1), ...additionalLanguageOptions] : languageOptions}
                selectedOptions={languages}
                onChange={handleLanguagesChange}
                onShowMore={() => setShowMoreLanguages(!showMoreLanguages)}
            />

            <CheckboxGroup
                title="Facility"
                options={facilityOptions}
                selectedOptions={facilities}
                onChange={handleFacilitiesChange}
            />
        </div>
    );
};

export default FilterSidebar;