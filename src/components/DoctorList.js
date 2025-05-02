import React from 'react';
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
  const doctors = [
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
    },
  ];

  return (
    <div className="flex-1 p-4">
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