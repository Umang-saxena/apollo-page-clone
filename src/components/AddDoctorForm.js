"use client";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  specialty: Yup.string().required('Specialty is required'),
  experienceYears: Yup.number()
    .required('Experience years is required')
    .min(0, 'Experience years cannot be negative'),
  experienceQualification: Yup.string().required('Qualification is required'),
  clinic: Yup.string().required('Clinic is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  fees: Yup.number()
    .required('Fees is required')
    .min(0, 'Fees cannot be negative'),
  cashback: Yup.number()
    .min(0, 'Cashback cannot be negative')
    .nullable(),
  imageUrl: Yup.string()
    .url('Must be a valid URL')
    .required('Image URL is required'),
  languages: Yup.string().required('Languages are required'),
  availability: Yup.string().required('Availability is required'),
  modeOfConsult: Yup.array()
    .min(1, 'Select at least one consultation mode')
    .required('Consultation mode is required'),
});

const AddDoctorForm = () => {
  const availabilityOptions = ['Available Now', 'Available Today', 'Available Tomorrow', 'Not Available'];
  const modeOfConsultOptions = ['Hospital Visit', 'Online'];

  const initialValues = {
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
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Prepare data to match the doctor model structure
    const dataToSend = {
      name: values.name,
      specialty: values.specialty,
      experience: {
        years: Number(values.experienceYears),
        qualification: values.experienceQualification,
      },
      location: {
        clinic: values.clinic,
        city: values.city,
        state: values.state,
      },
      fees: Number(values.fees),
      cashback: values.cashback ? Number(values.cashback) : null,
      isDoctorOfTheHour: values.isDoctorOfTheHour,
      imageUrl: values.imageUrl,
      availability: values.availability,
      languages: values.languages.split(',').map((lang) => lang.trim()),
      modeOfConsult: values.modeOfConsult,
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
        resetForm();
      } else {
        alert('Failed to add doctor.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md h-full w-full max-w-[600px] mx-auto mt-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white text-gray-500 w-full max-w-[580px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Doctor</h2>

            <div className="mb-2">
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <Field
                name="specialty"
                type="text"
                placeholder="Specialty"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="specialty" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <Field
                name="experienceYears"
                type="number"
                placeholder="Experience Years"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="experienceYears" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <Field
                name="experienceQualification"
                type="text"
                placeholder="Experience Qualification"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="experienceQualification" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <Field
                name="clinic"
                type="text"
                placeholder="Clinic"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="clinic" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <Field
                name="city"
                type="text"
                placeholder="City"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <Field
                name="state"
                type="text"
                placeholder="State"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="state" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <Field
                name="fees"
                type="number"
                placeholder="Fees"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="fees" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <Field
                name="cashback"
                type="number"
                placeholder="Cashback (optional)"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="cashback" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <label className="inline-flex items-center mt-2 mb-2">
              <Field
                name="isDoctorOfTheHour"
                type="checkbox"
                className="form-checkbox"
              />
              <span className="ml-2">Doctor of the Hour</span>
            </label>

            <div className="mb-2">
              <Field
                name="imageUrl"
                type="text"
                placeholder="Image URL"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <label className="block">
                Availability:
                <Field
                  as="select"
                  name="availability"
                  className="w-full border mt-1 border-gray-500/10 rounded py-2.5 px-3"
                >
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </label>
              <ErrorMessage name="availability" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <Field
                name="languages"
                type="text"
                placeholder="Languages (comma separated)"
                className="w-full border mt-1 border-gray-500/10 outline-none rounded py-2.5 px-3"
              />
              <ErrorMessage name="languages" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-2">
              <label className="block">
                Mode of Consult:
                <Field
                  as="select"
                  name="modeOfConsult"
                  multiple
                  className="w-full border mt-1 border-gray-500/10 rounded py-2.5 px-3"
                >
                  {modeOfConsultOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </label>
              <ErrorMessage name="modeOfConsult" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium disabled:opacity-50"
            >
              Add Doctor
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDoctorForm;