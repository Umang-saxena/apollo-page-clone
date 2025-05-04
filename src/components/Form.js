"use client";
import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experienceYears: '',
    experienceQualification: '',
    clinic: '',
    city: '',
    state: '',
    fees: '',
    cashback: '',
    isDoctorOfTheHour: false,
    imageUrl: '',
    availability: 'Available Now',
    languages: '',
    modeOfConsult: [],
  });

  const availabilityOptions = ['Available Now', 'Available Today', 'Available Tomorrow', 'Not Available'];
  const modeOfConsultOptions = ['Hospital Visit', 'Online'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === 'select-multiple') {
      const options = e.target.options;
      const values = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          values.push(options[i].value);
        }
      }
      setFormData((prev) => ({
        ...prev,
        [name]: values,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to match the doctor model structure
    const dataToSend = {
      name: formData.name,
      specialty: formData.specialty,
      experience: {
        years: Number(formData.experienceYears),
        qualification: formData.experienceQualification,
      },
      location: {
        clinic: formData.clinic,
        city: formData.city,
        state: formData.state,
      },
      fees: Number(formData.fees),
      cashback: formData.cashback ? Number(formData.cashback) : null,
      isDoctorOfTheHour: formData.isDoctorOfTheHour,
      imageUrl: formData.imageUrl,
      availability: formData.availability,
      languages: formData.languages.split(',').map((lang) => lang.trim()),
      modeOfConsult: formData.modeOfConsult,
    };

    try {
      const response = await fetch('/api/add-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Doctor added successfully!');
        setFormData({
          name: '',
          specialty: '',
          experienceYears: '',
          experienceQualification: '',
          clinic: '',
          city: '',
          state: '',
          fees: '',
          cashback: '',
          isDoctorOfTheHour: false,
          imageUrl: '',
          availability: 'Available Now',
          languages: '',
          modeOfConsult: [],
        });
      } else {
        alert('Failed to add doctor.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md h-full w-full max-w-[600px] mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 w-full max-w-[580px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Doctor</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Name"
          required
        />

        <input
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Specialty"
          required
        />

        <input
          name="experienceYears"
          value={formData.experienceYears}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="number"
          placeholder="Experience Years"
          required
          min="0"
        />

        <input
          name="experienceQualification"
          value={formData.experienceQualification}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Experience Qualification"
          required
        />

        <input
          name="clinic"
          value={formData.clinic}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Clinic"
          required
        />

        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="City"
          required
        />

        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="State"
          required
        />

        <input
          name="fees"
          value={formData.fees}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="number"
          placeholder="Fees"
          required
          min="0"
        />

        <input
          name="cashback"
          value={formData.cashback}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="number"
          placeholder="Cashback (optional)"
          min="0"
        />

        <label className="inline-flex items-center mt-2 mb-2">
          <input
            name="isDoctorOfTheHour"
            type="checkbox"
            checked={formData.isDoctorOfTheHour}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span className="ml-2">Doctor of the Hour</span>
        </label>

        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Image URL"
          required
        />

        <label className="block mt-2 mb-2">
          Availability:
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full border mt-1 border-gray-500/10 rounded py-2.5 px-3"
            required
          >
            {availabilityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <input
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          className="w-full border mt-1 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Languages (comma separated)"
          required
        />

        <label className="block mt-2 mb-2">
          Mode of Consult:
          <select
            name="modeOfConsult"
            multiple
            value={formData.modeOfConsult}
            onChange={handleChange}
            className="w-full border mt-1 border-gray-500/10 rounded py-2.5 px-3"
            required
          >
            {modeOfConsultOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default Form;
