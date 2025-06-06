import React, { Suspense } from 'react';
import Navbar from "../components/Navbar";
import DoctorList from "../components/DoctorList";
// import FilterSidebar from "components/FilterSidebar";
// import FilterSidebar from "components/FilterSidebar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 bg-white gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <div className="grid grid-cols-12 w-full gap-4">
        <main className="col-span-9">
          <Suspense fallback={<div>Loading...</div>}>
            <DoctorList />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
